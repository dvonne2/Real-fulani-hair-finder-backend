/**
 * FULANI HAIR GRO - COMPREHENSIVE QUIZ RECOMMENDATION ENGINE
 * Complete 15-question analysis system for personalized hair loss solutions
 * 
 * This engine performs:
 * - Multi-factor root cause analysis
 * - Cross-pattern detection across all 15 questions
 * - Intelligent product recommendations
 * - Personalized action plans
 * - Risk severity assessment
 */

class FulaniQuizRecommendationEngine {
  constructor() {
    this.quizData = null;
    this.analysis = {
      rootCauses: [],
      riskLevel: '',
      urgency: '',
      patternType: '',
      recommendations: [],
      actionPlan: {},
      educationalPriorities: []
    };
  }

  /**
   * MAIN ANALYSIS METHOD
   * Processes all quiz responses and generates comprehensive recommendations
   */
  analyzeQuizResults(responses) {
    this.quizData = responses;
    
    // Step 1: Identify root causes
    this.identifyRootCauses();
    
    // Step 2: Detect patterns across questions
    this.detectCrossPatterns();
    
    // Step 3: Calculate risk severity
    this.calculateRiskSeverity();
    
    // Step 4: Generate product recommendations
    this.generateProductRecommendations();
    
    // Step 5: Create personalized action plan
    this.createActionPlan();
    
    // Step 6: Prioritize education content
    this.prioritizeEducation();
    
    return this.analysis;
  }

  /**
   * STEP 1: ROOT CAUSE IDENTIFICATION
   * Analyzes all questions to determine primary causes of hair loss
   */
  identifyRootCauses() {
    const causes = [];
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15 } = this.quizData;

    // HORMONAL ANALYSIS
    if (this.isHormonalCause(q1, q4, q12, q14)) {
      causes.push({
        type: 'hormonal',
        confidence: this.calculateHormonalConfidence(q1, q4, q12, q14),
        indicators: this.getHormonalIndicators(q1, q4, q12, q14),
        priority: 'high'
      });
    }

    // TRACTION ALOPECIA ANALYSIS
    if (this.isTractionCause(q2, q4, q7)) {
      causes.push({
        type: 'traction',
        confidence: this.calculateTractionConfidence(q2, q4, q7),
        indicators: this.getTractionIndicators(q2, q4, q7),
        priority: this.getTractionPriority(q3, q7)
      });
    }

    // NUTRITIONAL/MEDICAL ANALYSIS
    if (this.isNutritionalCause(q5, q12, q14)) {
      causes.push({
        type: 'nutritional',
        confidence: this.calculateNutritionalConfidence(q5, q12, q14),
        indicators: this.getNutritionalIndicators(q5, q12, q14),
        priority: 'medium'
      });
    }

    // SCALP HEALTH ANALYSIS
    if (this.isScalpHealthCause(q8, q10, q11)) {
      causes.push({
        type: 'scalpHealth',
        confidence: this.calculateScalpHealthConfidence(q8, q10, q11),
        indicators: this.getScalpHealthIndicators(q8, q10, q11),
        priority: 'medium'
      });
    }

    // GENETIC ANALYSIS
    if (this.isGeneticCause(q4, q13)) {
      causes.push({
        type: 'genetic',
        confidence: this.calculateGeneticConfidence(q4, q13),
        indicators: ['Family history present'],
        priority: 'low'
      });
    }

    // BREAKAGE/MECHANICAL ANALYSIS
    if (this.isBreakageCause(q5, q6, q9, q11)) {
      causes.push({
        type: 'breakage',
        confidence: this.calculateBreakageConfidence(q5, q6, q9, q11),
        indicators: this.getBreakageIndicators(q5, q6, q9, q11),
        priority: this.getBreakagePriority(q7, q9)
      });
    }

    // Sort by confidence and priority
    this.analysis.rootCauses = causes
      .sort((a, b) => {
        const priorityWeight = { high: 3, medium: 2, low: 1 };
        return (b.confidence + priorityWeight[b.priority]) - 
               (a.confidence + priorityWeight[a.priority]);
      });
  }

  /**
   * HORMONAL CAUSE DETECTION
   */
  isHormonalCause(age, areas, lifeEvents, medicalConditions) {
    // Age indicators
    const hormonalAges = ['46-55 years', '56+ years'];
    const ageMatch = hormonalAges.includes(age);

    // Pattern indicators (crown + temples = classic hormonal)
    const hormonalAreas = ['crown', 'temples', 'even_thinning'];
    const areaMatch = areas?.some(area => hormonalAreas.includes(area));

    // Life event indicators
    const hormonalEvents = [
      'pregnancy', 'postpartum', 'breastfeeding', 
      'menopause', 'perimenopause', 'birth_control'
    ];
    const eventMatch = lifeEvents?.some(event => hormonalEvents.includes(event));

    // Medical condition indicators
    const hormonalConditions = ['pcos', 'thyroid'];
    const conditionMatch = medicalConditions?.some(cond => 
      hormonalConditions.includes(cond)
    );

    return ageMatch || eventMatch || conditionMatch || 
           (areaMatch && (ageMatch || eventMatch));
  }

  calculateHormonalConfidence(age, areas, lifeEvents, medicalConditions) {
    let confidence = 0;

    // Age scoring
    if (age === '46-55 years') confidence += 30;
    if (age === '56+ years') confidence += 25;

    // Pattern scoring
    const hormonalPattern = areas?.includes('crown') && areas?.includes('temples');
    if (hormonalPattern) confidence += 25;
    if (areas?.includes('even_thinning')) confidence += 20;

    // Life events scoring
    if (lifeEvents?.includes('menopause') || 
        lifeEvents?.includes('perimenopause')) confidence += 35;
    if (lifeEvents?.includes('postpartum')) confidence += 30;
    if (lifeEvents?.includes('birth_control')) confidence += 20;

    // Medical conditions scoring
    if (medicalConditions?.includes('pcos')) confidence += 40;
    if (medicalConditions?.includes('thyroid')) confidence += 35;

    return Math.min(confidence, 95); // Cap at 95%
  }

  getHormonalIndicators(age, areas, lifeEvents, medicalConditions) {
    const indicators = [];

    if (['46-55 years', '56+ years'].includes(age)) {
      indicators.push(`Age-related hormonal changes (${age})`);
    }

    if (areas?.includes('crown') && areas?.includes('temples')) {
      indicators.push('Classic hormonal hair loss pattern');
    }

    if (lifeEvents?.includes('menopause') || 
        lifeEvents?.includes('perimenopause')) {
      indicators.push('Menopause-related hormonal shift');
    }

    if (lifeEvents?.includes('postpartum')) {
      indicators.push('Postpartum hormonal changes');
    }

    if (medicalConditions?.includes('pcos')) {
      indicators.push('PCOS (hormonal imbalance)');
    }

    if (medicalConditions?.includes('thyroid')) {
      indicators.push('Thyroid disorder');
    }

    return indicators;
  }

  /**
   * TRACTION ALOPECIA DETECTION
   */
  isTractionCause(primaryConcern, areas, styles) {
    // Primary concern indicators
    const tractionConcerns = ['thinning_edges', 'bald_patches'];
    const concernMatch = tractionConcerns.includes(primaryConcern);

    // Area indicators (edges + temples = classic traction)
    const tractionAreas = ['edges', 'temples', 'nape'];
    const areaMatch = areas?.some(area => tractionAreas.includes(area));

    // High-risk styles
    const highRiskStyles = [
      'million_braids', 'micro_twists', 'tight_ponytails',
      'box_braids', 'ghana_weaving', 'wigs_with_glue'
    ];
    const styleMatch = styles?.some(style => highRiskStyles.includes(style));

    return (concernMatch && areaMatch) || (areaMatch && styleMatch);
  }

  calculateTractionConfidence(primaryConcern, areas, styles) {
    let confidence = 0;

    // Primary concern scoring
    if (primaryConcern === 'thinning_edges') confidence += 40;
    if (primaryConcern === 'bald_patches') confidence += 35;

    // Area scoring
    if (areas?.includes('edges')) confidence += 30;
    if (areas?.includes('temples')) confidence += 25;
    if (areas?.includes('nape')) confidence += 20;

    // Style risk scoring
    const criticalStyles = ['million_braids', 'tight_ponytails', 'wigs_with_glue'];
    const highRiskStyles = ['micro_twists', 'box_braids', 'ghana_weaving'];
    
    criticalStyles.forEach(style => {
      if (styles?.includes(style)) confidence += 15;
    });

    highRiskStyles.forEach(style => {
      if (styles?.includes(style)) confidence += 10;
    });

    // Multiple high-risk styles compound the problem
    if (styles?.length >= 3) confidence += 20;

    return Math.min(confidence, 95);
  }

  getTractionIndicators(primaryConcern, areas, styles) {
    const indicators = [];

    if (primaryConcern === 'thinning_edges') {
      indicators.push('Primary concern: Edge thinning/recession');
    }

    if (areas?.includes('edges') || areas?.includes('temples')) {
      indicators.push('Hair loss concentrated at tension points');
    }

    const criticalStyles = {
      'million_braids': 'Million braids (extreme tension)',
      'tight_ponytails': 'Tight ponytails (chronic pulling)',
      'wigs_with_glue': 'Glued wigs (adhesive + tension damage)',
      'micro_twists': 'Micro twists (prolonged tension)',
      'box_braids': 'Box braids (weight + tension)'
    };

    styles?.forEach(style => {
      if (criticalStyles[style]) {
        indicators.push(criticalStyles[style]);
      }
    });

    return indicators;
  }

  getTractionPriority(duration, styles) {
    // Check duration
    const longDuration = ['12-24 months', '24+ months'].includes(duration);
    
    // Check for critical styles
    const criticalStyles = ['million_braids', 'tight_ponytails', 'wigs_with_glue'];
    const hasCriticalStyle = styles?.some(style => criticalStyles.includes(style));

    if (longDuration && hasCriticalStyle) return 'critical';
    if (longDuration || hasCriticalStyle) return 'high';
    return 'medium';
  }

  /**
   * NUTRITIONAL/MEDICAL CAUSE DETECTION
   */
  isNutritionalCause(hairLossType, lifeEvents, medicalConditions) {
    // Shedding pattern (not breakage) suggests nutritional
    const sheddingPattern = hairLossType === 'shedding' || 
                           hairLossType === 'both';

    // Life events that trigger telogen effluvium
    const triggerEvents = [
      'surgery', 'illness', 'significant_stress', 
      'pregnancy', 'postpartum'
    ];
    const eventMatch = lifeEvents?.some(event => triggerEvents.includes(event));

    // Medical conditions affecting nutrition
    const nutritionalConditions = ['anemia', 'vitamin_deficiency', 'autoimmune'];
    const conditionMatch = medicalConditions?.some(cond => 
      nutritionalConditions.includes(cond)
    );

    return (sheddingPattern && eventMatch) || conditionMatch;
  }

  calculateNutritionalConfidence(hairLossType, lifeEvents, medicalConditions) {
    let confidence = 0;

    // Hair loss type scoring
    if (hairLossType === 'shedding') confidence += 25;
    if (hairLossType === 'both') confidence += 15;

    // Life events scoring
    if (lifeEvents?.includes('surgery') || 
        lifeEvents?.includes('illness')) confidence += 30;
    if (lifeEvents?.includes('significant_stress')) confidence += 25;
    if (lifeEvents?.includes('postpartum')) confidence += 30;

    // Medical conditions scoring
    if (medicalConditions?.includes('anemia')) confidence += 40;
    if (medicalConditions?.includes('vitamin_deficiency')) confidence += 35;
    if (medicalConditions?.includes('autoimmune')) confidence += 30;

    return Math.min(confidence, 90);
  }

  getNutritionalIndicators(hairLossType, lifeEvents, medicalConditions) {
    const indicators = [];

    if (hairLossType === 'shedding') {
      indicators.push('Excessive shedding (telogen effluvium pattern)');
    }

    if (lifeEvents?.includes('surgery') || lifeEvents?.includes('illness')) {
      indicators.push('Recent surgery/illness (nutritional stress)');
    }

    if (lifeEvents?.includes('postpartum')) {
      indicators.push('Postpartum shedding (nutritional depletion)');
    }

    if (medicalConditions?.includes('anemia')) {
      indicators.push('Anemia (iron deficiency)');
    }

    if (medicalConditions?.includes('vitamin_deficiency')) {
      indicators.push('Diagnosed vitamin/mineral deficiency');
    }

    return indicators;
  }

  /**
   * SCALP HEALTH CAUSE DETECTION
   */
  isScalpHealthCause(coveredHairIssues, scalpIssues, washFrequency) {
    // Covered hair problems
    const scalpSymptoms = [
      'itchy_scalp', 'excessive_sweating', 'scalp_issues_worse'
    ].includes(coveredHairIssues);

    // Direct scalp issues
    const hasScalpIssues = scalpIssues?.length > 0 && 
                          !scalpIssues.includes('no_scalp_issues');

    // Problematic wash frequency
    const poorHygiene = washFrequency === 'less_than_monthly' ||
                       (washFrequency === 'only_when_taking_down' && 
                        coveredHairIssues !== 'no_regular_covering');

    return scalpSymptoms || hasScalpIssues || poorHygiene;
  }

  calculateScalpHealthConfidence(coveredHairIssues, scalpIssues, washFrequency) {
    let confidence = 0;

    // Covered hair issues scoring
    if (coveredHairIssues === 'itchy_scalp') confidence += 25;
    if (coveredHairIssues === 'scalp_issues_worse') confidence += 30;
    if (coveredHairIssues === 'excessive_sweating') confidence += 20;

    // Scalp issues scoring
    const severeIssues = ['ringworm', 'painful_spots', 'sores'];
    const moderateIssues = ['dandruff', 'itchy_scalp', 'excessive_oiliness', 'dry_scalp'];

    severeIssues.forEach(issue => {
      if (scalpIssues?.includes(issue)) confidence += 35;
    });

    moderateIssues.forEach(issue => {
      if (scalpIssues?.includes(issue)) confidence += 20;
    });

    // Wash frequency scoring
    if (washFrequency === 'less_than_monthly') confidence += 25;
    if (washFrequency === 'only_when_taking_down') confidence += 15;

    return Math.min(confidence, 90);
  }

  getScalpHealthIndicators(coveredHairIssues, scalpIssues, washFrequency) {
    const indicators = [];

    if (coveredHairIssues === 'itchy_scalp') {
      indicators.push('Itching when hair is covered (poor scalp circulation)');
    }

    if (coveredHairIssues === 'scalp_issues_worse') {
      indicators.push('Scalp problems worsen under covering');
    }

    const issueDescriptions = {
      'ringworm': 'Fungal infection present (requires treatment)',
      'dandruff': 'Dandruff/seborrheic dermatitis',
      'itchy_scalp': 'Chronic scalp itching',
      'painful_spots': 'Painful or tender scalp areas',
      'sores': 'Scalp sores or scabs',
      'excessive_oiliness': 'Excessive scalp oil production',
      'dry_scalp': 'Very dry, tight scalp'
    };

    scalpIssues?.forEach(issue => {
      if (issueDescriptions[issue]) {
        indicators.push(issueDescriptions[issue]);
      }
    });

    if (washFrequency === 'less_than_monthly') {
      indicators.push('Infrequent washing (scalp hygiene concern)');
    }

    return indicators;
  }

  /**
   * GENETIC CAUSE DETECTION
   */
  isGeneticCause(areas, familyHistory) {
    const hasGenetics = familyHistory && familyHistory !== 'no_family_history';
    const typicalPattern = areas?.includes('crown') || 
                          areas?.includes('temples') ||
                          areas?.includes('even_thinning');
    
    return hasGenetics && typicalPattern;
  }

  calculateGeneticConfidence(areas, familyHistory) {
    let confidence = 0;

    // Family history scoring
    if (familyHistory === 'both_parents') confidence += 60;
    if (familyHistory === 'mother_thin_edges') confidence += 40;
    if (familyHistory === 'father_bald') confidence += 35;
    if (familyHistory === 'siblings_relatives') confidence += 30;

    // Pattern scoring
    if (areas?.includes('crown')) confidence += 15;
    if (areas?.includes('temples')) confidence += 10;
    if (areas?.includes('even_thinning')) confidence += 10;

    return Math.min(confidence, 75); // Genetic is contributory, rarely sole cause
  }

  /**
   * BREAKAGE/MECHANICAL CAUSE DETECTION
   */
  isBreakageCause(hairLossType, lengthPattern, sleepProtection, washFrequency) {
    const breakageType = hairLossType === 'breakage' || hairLossType === 'both';
    const unevenLength = lengthPattern !== 'all_same_length';
    const noProtection = sleepProtection === 'cotton_pillowcase' || 
                        sleepProtection === 'sleep_with_weave';
    const overwashing = washFrequency === 'weekly_or_more';

    return breakageType && (unevenLength || noProtection || overwashing);
  }

  calculateBreakageConfidence(hairLossType, lengthPattern, sleepProtection, washFrequency) {
    let confidence = 0;

    // Hair loss type scoring
    if (hairLossType === 'breakage') confidence += 35;
    if (hairLossType === 'both') confidence += 25;

    // Length pattern scoring
    if (lengthPattern === 'crown_longest_edges_shortest') confidence += 25;
    if (lengthPattern === 'back_longest_front_shortest') confidence += 20;
    if (lengthPattern === 'sides_longest_middle_shortest') confidence += 20;

    // Sleep protection scoring
    if (sleepProtection === 'cotton_pillowcase') confidence += 25;
    if (sleepProtection === 'sleep_with_weave') confidence += 30;

    // Wash frequency scoring
    if (washFrequency === 'weekly_or_more') confidence += 15;

    return Math.min(confidence, 90);
  }

  getBreakageIndicators(hairLossType, lengthPattern, sleepProtection, washFrequency) {
    const indicators = [];

    if (hairLossType === 'breakage') {
      indicators.push('Hair breaking at different lengths (mechanical damage)');
    }

    const lengthDescriptions = {
      'crown_longest_edges_shortest': 'Edges breaking more than crown (tension damage)',
      'back_longest_front_shortest': 'Front hair breaking (friction/styling damage)',
      'sides_longest_middle_shortest': 'Uneven breakage pattern'
    };

    if (lengthDescriptions[lengthPattern]) {
      indicators.push(lengthDescriptions[lengthPattern]);
    }

    if (sleepProtection === 'cotton_pillowcase') {
      indicators.push('Cotton pillowcase (high friction damage)');
    }

    if (sleepProtection === 'sleep_with_weave') {
      indicators.push('Sleeping in wig/weave (friction + poor scalp circulation)');
    }

    return indicators;
  }

  getBreakagePriority(styles, sleepProtection) {
    const highRiskStyles = ['million_braids', 'tight_ponytails', 'micro_twists'];
    const hasHighRisk = styles?.some(style => highRiskStyles.includes(style));
    const badSleepHabits = sleepProtection === 'cotton_pillowcase' || 
                          sleepProtection === 'sleep_with_weave';

    if (hasHighRisk && badSleepHabits) return 'high';
    return 'medium';
  }

  /**
   * STEP 2: CROSS-PATTERN DETECTION
   * Identifies compound issues and complex scenarios
   */
  detectCrossPatterns() {
    const causes = this.analysis.rootCauses.map(c => c.type);
    const { q1, q2, q3, q7, q12, q14 } = this.quizData;

    // PATTERN 1: Hormonal + Traction (Double Threat)
    if (causes.includes('hormonal') && causes.includes('traction')) {
      this.analysis.patternType = 'compound_hormonal_traction';
      this.analysis.urgency = 'critical';
      this.analysis.specialNote = 
        'CRITICAL: You have TWO major causes working against you - ' +
        'hormonal changes AND chronic tension. This requires immediate ' +
        'action on both fronts or hair loss will accelerate.';
    }

    // PATTERN 2: Young + Severe Traction (Preventable Crisis)
    else if (q1 === '18-25 years' && causes.includes('traction') && 
             ['12-24 months', '24+ months'].includes(q3)) {
      this.analysis.patternType = 'young_advanced_traction';
      this.analysis.urgency = 'critical';
      this.analysis.specialNote = 
        'URGENT: At your age, this should NOT be happening. Your styling ' +
        'habits are causing permanent damage. The good news? This is 100% ' +
        'reversible if you act NOW. Wait longer and damage becomes permanent.';
    }

    // PATTERN 3: Nutritional + Recent Event (Temporary Crisis)
    else if (causes.includes('nutritional') && 
             q12?.some(event => ['surgery', 'postpartum', 'illness'].includes(event)) &&
             ['<3 months', '3-6 months'].includes(q3)) {
      this.analysis.patternType = 'temporary_telogen_effluvium';
      this.analysis.urgency = 'medium';
      this.analysis.specialNote = 
        'REASSURING: This appears to be temporary shedding (telogen effluvium) ' +
        'triggered by a recent life event. Hair typically regrows in 6-12 months ' +
        'with proper support. Focus on nutrition and gentle care.';
    }

    // PATTERN 4: Multiple Scalp Issues + Poor Hygiene (Foundation Problem)
    else if (causes.includes('scalpHealth') && 
             this.quizData.q10?.length >= 3) {
      this.analysis.patternType = 'scalp_health_crisis';
      this.analysis.urgency = 'high';
      this.analysis.specialNote = 
        'PRIORITY: Multiple scalp issues detected. Healthy hair cannot grow from ' +
        'an unhealthy scalp. We must heal your scalp FIRST before focusing on growth.';
    }

    // PATTERN 5: Perfect Storm (All Major Factors)
    else if (causes.length >= 4) {
      this.analysis.patternType = 'multifactorial_complex';
      this.analysis.urgency = 'high';
      this.analysis.specialNote = 
        'COMPLEX CASE: Multiple factors contributing to your hair loss. ' +
        'This requires a comprehensive, multi-pronged approach. The good news? ' +
        'Each issue we address will show cumulative improvements.';
    }

    // PATTERN 6: Minimal Issues (False Alarm)
    else if (causes.length === 0 || 
             (causes.length === 1 && causes[0] === 'genetic')) {
      this.analysis.patternType = 'minimal_concern';
      this.analysis.urgency = 'low';
      this.analysis.specialNote = 
        'POSITIVE: Limited concerning factors detected. Your hair loss may be ' +
        'within normal range or early-stage. Focus on prevention and optimization.';
    }

    // DEFAULT: Single dominant cause
    else {
      this.analysis.patternType = 'single_dominant_cause';
      this.analysis.urgency = this.analysis.rootCauses[0].priority;
    }
  }

  /**
   * STEP 3: RISK SEVERITY CALCULATION
   */
  calculateRiskSeverity() {
    let severityScore = 0;

    // Duration scoring
    const durationScores = {
      'less_than_3_months': 10,
      '3-6_months': 20,
      '6-12_months': 40,
      '12-24_months': 60,
      '24+_months': 80
    };
    severityScore += durationScores[this.quizData.q3] || 0;

    // Root cause severity
    this.analysis.rootCauses.forEach(cause => {
      if (cause.priority === 'critical') severityScore += 40;
      else if (cause.priority === 'high') severityScore += 25;
      else if (cause.priority === 'medium') severityScore += 15;
      else severityScore += 5;
    });

    // Pattern type modifier
    if (this.analysis.patternType === 'compound_hormonal_traction') severityScore += 30;
    else if (this.analysis.patternType === 'young_advanced_traction') severityScore += 25;
    else if (this.analysis.patternType === 'scalp_health_crisis') severityScore += 20;

    // Determine risk level
    if (severityScore >= 150) {
      this.analysis.riskLevel = 'critical';
    } else if (severityScore >= 100) {
      this.analysis.riskLevel = 'high';
    } else if (severityScore >= 50) {
      this.analysis.riskLevel = 'medium';
    } else {
      this.analysis.riskLevel = 'low';
    }
  }

  /**
   * STEP 4: PRODUCT RECOMMENDATIONS
   * Generates personalized product list based on root causes and goals
   */
  generateProductRecommendations() {
    const recommendations = [];
    const { rootCauses } = this.analysis;
    const { q2, q15 } = this.quizData;

    rootCauses.forEach(cause => {
      switch(cause.type) {
        case 'hormonal':
          recommendations.push({
            category: 'Hormonal Support',
            products: [
              {
                name: 'Fulani Hair Gro™ Serum (Hormonal Formula)',
                reason: 'Supports hair follicles during hormonal changes',
                priority: 'essential',
                frequency: 'Daily application'
              },
              {
                name: 'Scalp Circulation Booster Oil',
                reason: 'Improves blood flow to follicles',
                priority: 'recommended',
                frequency: '3x per week massage'
              },
              {
                name: 'Hormone Balance Supplement',
                reason: 'Internal support for hormonal equilibrium',
                priority: 'recommended',
                frequency: 'Daily oral supplement'
              }
            ]
          });
          break;

        case 'traction':
          recommendations.push({
            category: 'Edge Repair & Tension Relief',
            products: [
              {
                name: 'Fulani Hair Gro™ Edge Recovery Serum',
                reason: 'Intensive treatment for thinning edges',
                priority: 'essential',
                frequency: 'Morning & night'
              },
              {
                name: 'Tension Relief Scalp Massage Oil',
                reason: 'Restores circulation to damaged areas',
                priority: 'essential',
                frequency: '5min massage daily'
              },
              {
                name: 'Protective Style Alternative Bundle',
                reason: 'Low-tension styling options',
                priority: 'highly_recommended',
                frequency: 'As needed'
              }
            ],
            criticalAction: {
              title: 'STOP ALL HIGH-TENSION STYLES IMMEDIATELY',
              details: [
                'Remove million braids/micro twists NOW',
                'Give edges minimum 90-day rest period',
                'Switch to loose, protective alternatives'
              ]
            }
          });
          break;

        case 'nutritional':
          recommendations.push({
            category: 'Nutritional Support',
            products: [
              {
                name: 'Hair Growth Vitamin Complex',
                reason: 'Addresses nutritional deficiencies',
                priority: 'essential',
                frequency: 'Daily with food'
              },
              {
                name: 'Strengthening Protein Treatment',
                reason: 'Rebuilds hair structure from inside out',
                priority: 'recommended',
                frequency: 'Weekly treatment'
              }
            ],
            medicalAdvice: 'Consider blood work to check iron, vitamin D, B12 levels'
          });
          break;

        case 'scalpHealth':
          recommendations.push({
            category: 'Scalp Health Restoration',
            products: [
              {
                name: 'Scalp Detox & Clarifying Treatment',
                reason: 'Deep cleans scalp, removes buildup',
                priority: 'essential',
                frequency: 'Weekly deep cleanse'
              },
              {
                name: 'Antimicrobial Scalp Tonic',
                reason: 'Treats scalp issues (dandruff, itching, inflammation)',
                priority: 'essential',
                frequency: 'Daily application'
              },
              {
                name: 'Balanced pH Shampoo',
                reason: 'Gentle cleansing without stripping',
                priority: 'recommended',
                frequency: 'Regular wash days'
              }
            ]
          });
          break;

        case 'breakage':
          recommendations.push({
            category: 'Breakage Prevention & Repair',
            products: [
              {
                name: 'Silk/Satin Bonnet & Pillowcase Set',
                reason: 'Eliminates friction damage during sleep',
                priority: 'essential',
                frequency: 'Every night'
              },
              {
                name: 'Strengthening Leave-In Conditioner',
                reason: 'Protects hair from mechanical damage',
                priority: 'essential',
                frequency: 'Daily or after every wash'
              },
              {
                name: 'Protein-Moisture Balance Treatment',
                reason: 'Prevents breakage by maintaining elasticity',
                priority: 'recommended',
                frequency: 'Bi-weekly alternating'
              }
            ]
          });
          break;
      }
    });

    // Add goal-specific recommendations
    if (q15 === 'regrow_edges') {
      recommendations.unshift({
        category: 'Edge-Specific Solutions',
        products: [
          {
            name: 'Edge Control (No-Tension Formula)',
            reason: 'Styles edges without pulling',
            priority: 'optional',
            frequency: 'Styling only'
          }
        ]
      });
    }

    if (q15 === 'fill_bald_patches') {
      recommendations.push({
        category: 'Patch-Filling Treatment',
        products: [
          {
            name: 'Follicle Activator Concentrate',
            reason: 'Stimulates dormant follicles',
            priority: 'highly_recommended',
            frequency: 'Target affected areas 2x daily'
          }
        ]
      });
    }

    this.analysis.recommendations = recommendations;
  }

  /**
   * STEP 5: CREATE PERSONALIZED ACTION PLAN
   * Generates timeline-based action steps
   */
  createActionPlan() {
    const { riskLevel, rootCauses } = this.analysis;

    this.analysis.actionPlan = {
      immediate: this.getImmediateActions(rootCauses, riskLevel),
      week1: this.getWeek1Actions(rootCauses),
      month1: this.getMonth1Actions(rootCauses),
      month3: this.get3MonthActions(rootCauses),
      maintenance: this.getMaintenanceActions(rootCauses)
    };
  }

  getImmediateActions(rootCauses, riskLevel) {
    const actions = [];

    // Critical traction action
    if (rootCauses.find(c => c.type === 'traction' && 
                             ['critical', 'high'].includes(c.priority))) {
      actions.push({
        action: 'REMOVE high-tension styles TODAY',
        why: 'Every day of continued tension causes permanent follicle damage',
        howTo: 'Take down braids/twists, book appointment if needed'
      });
    }

    // Scalp health action
    if (rootCauses.find(c => c.type === 'scalpHealth')) {
      actions.push({
        action: 'Deep cleanse your scalp',
        why: 'Buildup and infections block follicles from producing hair',
        howTo: 'Use clarifying shampoo + scalp scrub, rinse thoroughly'
      });
    }

    // Medical conditions action
    if (this.quizData.q14?.some(cond => 
        ['ringworm', 'severe_anemia', 'thyroid'].includes(cond))) {
      actions.push({
        action: 'Schedule doctor appointment',
        why: 'Untreated medical conditions make hair growth impossible',
        howTo: 'See dermatologist or GP for proper diagnosis and treatment'
      });
    }

    // Universal action
    actions.push({
      action: 'Switch to silk/satin pillowcase TONIGHT',
      why: 'Cotton friction breaks hair while you sleep',
      howTo: 'Use existing bonnet or buy satin pillowcase (₦2,000-₽5,000)'
    });

    return actions;
  }

  getWeek1Actions(rootCauses) {
    const actions = [
      {
        action: 'Establish new hair care routine',
        tasks: [
          'Set wash day schedule (based on your Q11 answer)',
          'Organize products by purpose',
          'Create protective styling plan (low-tension only)'
        ]
      },
      {
        action: 'Start core treatment products',
        tasks: [
          'Apply Fulani Hair Gro™ serum morning & night',
          'Begin scalp massage routine (5 min daily)',
          'Use leave-in conditioner on damp hair'
        ]
      }
    ];

    if (rootCauses.find(c => c.type === 'nutritional')) {
      actions.push({
        action: 'Nutritional assessment',
        tasks: [
          'Start hair growth vitamins',
          'Book blood work appointment',
          'Review diet for protein, iron, vitamins'
        ]
      });
    }

    return actions;
  }

  getMonth1Actions(rootCauses) {
    return [
      {
        milestone: 'First signs of improvement',
        expect: [
          'Reduced shedding',
          'Lessscalp irritation',
          'Baby hairs starting to appear (if addressing traction)'
        ]
      },
      {
        action: 'Evaluate and adjust',
        tasks: [
          'Take progress photos',
          'Note which products work best',
          'Adjust routine if needed'
        ]
      },
      {
        action: 'Continue consistency',
        tasks: [
          'Maintain daily serum application',
          'Weekly deep conditioning',
          'Protective styling rotation'
        ]
      }
    ];
  }

  get3MonthActions(rootCauses) {
    return [
      {
        milestone: 'Significant progress checkpoint',
        expect: [
          'Visible new growth',
          'Healthier scalp',
          'Reduced breakage',
          'Improved hair density'
        ]
      },
      {
        action: 'Reassess situation',
        tasks: [
          'Compare photos from start',
          'Identify remaining problem areas',
          'Adjust treatment intensity'
        ]
      },
      {
        action: 'Introduce growth accelerators',
        tasks: [
          'Add follicle-stimulating treatments',
          'Increase massage frequency',
          'Consider professional scalp treatments'
        ]
      }
    ];
  }

  getMaintenanceActions(rootCauses) {
    return [
      {
        phase: 'Long-term success',
        actions: [
          'Continue protective practices even after regrowth',
          'Maintain scalp health routine',
          'Regular trims to prevent split ends',
          'Monitor for early signs of issues returning'
        ]
      },
      {
        lifestyle: 'Sustainable habits',
        actions: [
          'Choose low-tension styles permanently',
          'Sleep with bonnet/satin pillowcase always',
          'Maintain nutritious diet',
          'Manage stress levels',
          'Annual health checkups'
        ]
      }
    ];
  }

  /**
   * STEP 6: PRIORITIZE EDUCATION CONTENT
   * Determines which educational content to show first
   */
  prioritizeEducation() {
    const priorities = [];

    this.analysis.rootCauses.forEach((cause, index) => {
      let educationTopic;
      
      switch(cause.type) {
        case 'traction':
          educationTopic = {
            title: 'Understanding Traction Alopecia',
            priority: index + 1,
            topics: [
              'How tension damages follicles',
              'Why edges are most vulnerable',
              'Timeline for recovery',
              'Safe styling alternatives for Nigerian women',
              'When damage becomes permanent'
            ],
            urgency: 'This education could save your edges!'
          };
          break;

        case 'hormonal':
          educationTopic = {
            title: 'Hormonal Hair Loss Explained',
            priority: index + 1,
            topics: [
              'How hormones affect hair growth cycles',
              'Menopause/perimenopause and hair',
              'PCOS and hair loss connection',
              'Treatment options that work',
              'What to expect during recovery'
            ]
          };
          break;

        case 'nutritional':
          educationTopic = {
            title: 'Nutrition and Hair Growth',
            priority: index + 1,
            topics: [
              'Essential nutrients for hair',
              'Nigerian foods that support hair growth',
              'Telogen effluvium explained',
              'When to see a doctor',
              'Supplement recommendations'
            ]
          };
          break;

        case 'scalpHealth':
          educationTopic = {
            title: 'Scalp Health Fundamentals',
            priority: index + 1,
            topics: [
              'Why scalp health comes first',
              'Common scalp conditions in Nigeria',
              'Proper cleansing techniques',
              'Product buildup dangers',
              'When scalp issues need medical attention'
            ]
          };
          break;

        case 'breakage':
          educationTopic = {
            title: 'Preventing Breakage',
            priority: index + 1,
            topics: [
              'Breakage vs shedding - the difference',
              'Protein-moisture balance',
              'Nighttime hair protection',
              'Gentle detangling methods',
              'Building stronger hair'
            ]
          };
          break;
      }

      if (educationTopic) {
        priorities.push(educationTopic);
      }
    });

    // Add special pattern education
    if (this.analysis.patternType === 'compound_hormonal_traction') {
      priorities.unshift({
        title: 'CRITICAL: Managing Multiple Causes',
        priority: 0,
        topics: [
          'Why you need a multi-pronged approach',
          'Prioritizing treatments',
          'What to address first',
          'Realistic timeline expectations'
        ],
        urgency: 'START HERE - Understanding your unique situation'
      });
    }

    this.analysis.educationalPriorities = priorities;
  }
}

/**
 * USAGE EXAMPLE
 */
function processQuizSubmission(userResponses) {
  const engine = new FulaniQuizRecommendationEngine();
  const results = engine.analyzeQuizResults(userResponses);

  return {
    // For immediate display to user
    primaryDiagnosis: results.rootCauses[0],
    riskLevel: results.riskLevel,
    urgency: results.urgency,
    specialNote: results.specialNote,
    
    // For detailed results page
    fullAnalysis: results.rootCauses,
    patternType: results.patternType,
    
    // For product recommendations
    recommendedProducts: results.recommendations,
    
    // For action plan
    actionPlan: results.actionPlan,
    
    // For educational content
    prioritizedEducation: results.educationalPriorities,
    
    // For tracking/analytics
    allCauses: results.rootCauses.map(c => c.type),
    severityScore: results.riskLevel
  };
}

// Export for use in your application
module.exports = {
  FulaniQuizRecommendationEngine,
  processQuizSubmission
};
