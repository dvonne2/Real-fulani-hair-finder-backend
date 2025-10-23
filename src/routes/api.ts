import { Router, Request, Response } from 'express';
import { Product, QuizSubmission } from '../models';
import { SESEmailService } from '../services/email/sesEmailService';

// Import the JS engine (CommonJS)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { FulaniQuizRecommendationEngine } = require('../services/quiz/fulani-quiz-recommendation-engine.js');

const router = Router();

function validateResponses(responses: any): string | null {
  if (!responses || typeof responses !== 'object') return 'responses must be an object';
  for (let i = 1; i <= 15; i += 1) {
    const key = `q${i}`;
    if (!(key in responses)) return `missing question ${key}`;
  }
  return null;
}

// POST /api/quiz/submit
router.post('/quiz/submit', async (req: Request, res: Response) => {
  try {
    const { responses, email } = req.body || {};
    const err = validateResponses(responses);
    if (err) return res.status(400).json({ error: err });

    const engine = new FulaniQuizRecommendationEngine();
    const analysis = engine.analyzeQuizResults(responses);

    const primary = analysis.rootCauses?.[0] || null;

    const created = await QuizSubmission.create({
      user_email: email || null,
      responses,
      risk_level: analysis.riskLevel || null,
      urgency: analysis.urgency || null,
      pattern_type: analysis.patternType || null,
      primary_cause: primary?.type || null,
      primary_cause_confidence: primary?.confidence ?? null,
      root_causes: analysis.rootCauses || null,
      special_note: analysis.specialNote || null,
      recommendations: analysis.recommendations || null,
      action_plan: analysis.actionPlan || null,
      education_priorities: analysis.educationalPriorities || null,
      viewed_results: false,
    } as any);

    // Send email asynchronously if email provided and SES is configured
    try {
      const submissionId = Number((created as any).get?.('id') ?? (created as any).id);
      if (email) {
        const svc = new SESEmailService();
        const primaryCause = primary || (analysis.rootCauses?.[0] ?? null);
        void svc
          .sendQuizResultsEmail({
            email,
            submissionId,
            riskLevel: analysis.riskLevel || '',
            urgency: analysis.urgency || '',
            primaryCauseType: primaryCause?.type || '',
            primaryCauseConfidence: Number(primaryCause?.confidence ?? 0),
            primaryCauseDescription: Array.isArray(primaryCause?.indicators)
              ? primaryCause!.indicators.slice(0, 3).join(', ')
              : '',
            specialNote: analysis.specialNote || '',
          })
          .catch((err: any) => {
            // eslint-disable-next-line no-console
            console.error('SES send failed', err);
          });
      }
    } catch (mailErr) {
      // eslint-disable-next-line no-console
      console.error('SES init failed', mailErr);
    }

    const submissionId = Number((created as any).get?.('id') ?? (created as any).id);
    const resultsUrl = `/results/${submissionId}`;
    return res.status(201).json({ submissionId, resultsUrl, analysis });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('quiz submit failed', e);
    return res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

// GET /api/quiz/results/:submissionId
router.get('/quiz/results/:submissionId', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.submissionId);
    if (!id) return res.status(400).json({ error: 'invalid id' });
    const sub: any = await QuizSubmission.findByPk(id);
    if (!sub) return res.status(404).json({ error: 'Not found' });

    if (!sub.viewed_at) {
      sub.viewed_at = new Date();
      sub.viewed_results = true;
      await sub.save();
    }

    return res.json(sub);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('fetch results failed', e);
    return res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// GET /api/products/recommendations/:submissionId
router.get('/products/recommendations/:submissionId', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.submissionId);
    if (!id) return res.status(400).json({ error: 'invalid id' });
    const sub: any = await QuizSubmission.findByPk(id);
    if (!sub) return res.status(404).json({ error: 'Not found' });

    const causes: string[] = Array.isArray(sub.root_causes)
      ? sub.root_causes.map((c: any) => c?.type).filter(Boolean)
      : [];

    if (!causes.length) return res.json({ items: [] });

    // Find products that target any of the causes (intersection)
    const items = await Product.findAll({
      where: {
        is_active: true,
        // Sequelize ARRAY contains overlap is not portable; fetch all and filter in JS for simplicity
      },
      order: [['priority_level', 'ASC'], ['id', 'ASC']],
    });

    // Filter in memory for targets_causes overlap
    const matched = (items as any[]).filter(p => Array.isArray(p.targets_causes) && p.targets_causes.some((t: string) => causes.includes(t)));
    return res.json({ products: matched, causes });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('fetch product recos failed', e);
    return res.status(500).json({ error: 'Failed to fetch product recommendations' });
  }
});

export default router;
