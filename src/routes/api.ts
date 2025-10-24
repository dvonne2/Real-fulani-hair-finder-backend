import { Router, Request, Response } from 'express';
import { Product, QuizSubmission } from '../models';
import { SESEmailService } from '../services/email/sesEmailService';

// Import the JS engine (CommonJS)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { FulaniQuizRecommendationEngine } = require('../services/quiz/fulani-quiz-recommendation-engine.js');

const router = Router();

const memoryStore = new Map<number, any>();
const fallbackProducts: any[] = [
  { name: 'Fulani Hair Gro™ Serum (Hormonal Formula)', category: 'Hormonal Support', price_naira: 34990, targets_causes: ['hormonal'], priority_level: 'essential', frequency: 'Daily application' },
  { name: 'Scalp Circulation Booster Oil', category: 'Hormonal Support', price_naira: 14990, targets_causes: ['hormonal'], priority_level: 'recommended', frequency: '3x per week massage' },
  { name: 'Hormone Balance Supplement', category: 'Hormonal Support', price_naira: 17990, targets_causes: ['hormonal'], priority_level: 'recommended', frequency: 'Daily' },
  { name: 'Fulani Hair Gro™ Edge Recovery Serum', category: 'Edge Repair', price_naira: 24990, targets_causes: ['traction'], priority_level: 'essential', frequency: 'Morning & night' },
  { name: 'Tension Relief Scalp Massage Oil', category: 'Edge Repair', price_naira: 12990, targets_causes: ['traction'], priority_level: 'essential', frequency: 'Daily 5min' },
  { name: 'Protective Style Alternative Bundle', category: 'Styling', price_naira: 29990, targets_causes: ['traction'], priority_level: 'highly_recommended', frequency: 'As needed' },
  { name: 'Hair Growth Vitamin Complex', category: 'Nutrition', price_naira: 15990, targets_causes: ['nutritional'], priority_level: 'essential', frequency: 'Daily with food' },
  { name: 'Strengthening Protein Treatment', category: 'Repair', price_naira: 13990, targets_causes: ['nutritional','breakage'], priority_level: 'recommended', frequency: 'Weekly' },
  { name: 'Scalp Detox & Clarifying Treatment', category: 'Scalp Health', price_naira: 12990, targets_causes: ['scalpHealth'], priority_level: 'essential', frequency: 'Weekly deep cleanse' },
  { name: 'Antimicrobial Scalp Tonic', category: 'Scalp Health', price_naira: 14990, targets_causes: ['scalpHealth'], priority_level: 'essential', frequency: 'Daily application' },
  { name: 'Balanced pH Shampoo', category: 'Scalp Health', price_naira: 8990, targets_causes: ['scalpHealth'], priority_level: 'recommended', frequency: 'Wash days' },
  { name: 'Silk/Satin Bonnet & Pillowcase Set', category: 'Protection', price_naira: 7990, targets_causes: ['breakage'], priority_level: 'essential', frequency: 'Nightly' },
  { name: 'Strengthening Leave-In Conditioner', category: 'Repair', price_naira: 11990, targets_causes: ['breakage'], priority_level: 'essential', frequency: 'Daily / post-wash' },
  { name: 'Protein-Moisture Balance Treatment', category: 'Repair', price_naira: 14990, targets_causes: ['breakage'], priority_level: 'recommended', frequency: 'Bi-weekly' },
];

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

    let created: any = null;
    let createdId: number | null = null;
    let acceptedFallback = false;
    try {
      created = await QuizSubmission.create({
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
      createdId = Number((created as any).get?.('id') ?? (created as any).id);
    } catch {
      createdId = Date.now();
      acceptedFallback = true;
      const payload = {
        id: createdId,
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
        createdAt: new Date().toISOString(),
      };
      memoryStore.set(createdId, payload);
    }

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

    const submissionId = Number(createdId);
    const resultsUrl = `/results/${submissionId}`;
    if (acceptedFallback) {
      return res.status(202).json({ submissionId, resultsUrl, analysis });
    }
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
    let sub: any = null;
    try {
      sub = await QuizSubmission.findByPk(id);
    } catch {
      sub = null;
    }
    if (!sub) {
      const mem = memoryStore.get(id);
      if (!mem) return res.status(404).json({ error: 'Not found' });
      return res.json(mem);
    }

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
    let sub: any = null;
    try {
      sub = await QuizSubmission.findByPk(id);
    } catch {
      sub = null;
    }
    if (!sub) {
      const mem = memoryStore.get(id);
      if (!mem) return res.status(404).json({ error: 'Not found' });
      const causes: string[] = Array.isArray(mem.root_causes)
        ? mem.root_causes.map((c: any) => c?.type).filter(Boolean)
        : [];
      const matchedMem = (fallbackProducts as any[]).filter(p => Array.isArray(p.targets_causes) && p.targets_causes.some((t: string) => causes.includes(t)));
      return res.json({ products: matchedMem, causes });
    }

    const causes: string[] = Array.isArray(sub.root_causes)
      ? sub.root_causes.map((c: any) => c?.type).filter(Boolean)
      : [];

    if (!causes.length) return res.json({ items: [] });

    // Find products that target any of the causes (intersection)
    let items: any[] = [];
    try {
      items = await Product.findAll({
        where: {
          is_active: true,
        },
        order: [['priority_level', 'ASC'], ['id', 'ASC']],
      });
    } catch {
      items = fallbackProducts as any[];
    }

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
