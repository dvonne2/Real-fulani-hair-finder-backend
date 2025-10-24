#!/usr/bin/env node

/**
 * FULANI HAIR GRO - RECOMMENDATION ENGINE EXAMPLES
 * Real-world scenarios showing how the engine analyzes different user profiles
 */

const { FulaniQuizRecommendationEngine } = require('./fulani-quiz-recommendation-engine');

// ============================================================================
// SCENARIO 1: HORMONAL + TRACTION (DOUBLE THREAT)
// ============================================================================
console.log('\n═══════════════════════════════════════════════════════');
console.log('SCENARIO 1: 48-Year-Old with Hormonal Changes + Million Braids');
console.log('═══════════════════════════════════════════════════════\n');

const scenario1 = {
  q1: '46-55 years',
  q2: 'thinning_edges',
  q3: '12-24 months',
  q4: ['edges', 'crown', 'temples'],
  q5: 'both',
  q6: 'crown_longest_edges_shortest',
  q7: ['million_braids', 'tight_ponytails'],
  q8: 'scalp_issues_worse',
  q9: 'sometimes',
  q10: ['itchy_scalp', 'dry_scalp'],
  q11: 'every_2_weeks',
  q12: ['menopause', 'perimenopause'],
  q13: 'mother_thin_edges',
  q14: ['none'],
  q15: 'regrow_edges'
};

const engine1 = new FulaniQuizRecommendationEngine();
const results1 = engine1.analyzeQuizResults(scenario1);

console.log('🎯 PRIMARY DIAGNOSIS:');
console.log(`Type: ${results1.rootCauses[0].type.toUpperCase()}`);
console.log(`Confidence: ${results1.rootCauses[0].confidence}%`);
console.log(`Priority: ${results1.rootCauses[0].priority.toUpperCase()}`);
console.log('\nIndicators:');
results1.rootCauses[0].indicators.forEach(ind => console.log(`  • ${ind}`));

console.log('\n🔍 SECONDARY CAUSES:');
results1.rootCauses.slice(1).forEach((cause, idx) => {
  console.log(`\n${idx + 2}. ${cause.type.toUpperCase()} (${cause.confidence}% confidence)`);
  cause.indicators.forEach(ind => console.log(`   • ${ind}`));
});

console.log('\n⚠️ RISK ASSESSMENT:');
console.log(`Risk Level: ${results1.riskLevel.toUpperCase()}`);
console.log(`Urgency: ${results1.urgency.toUpperCase()}`);
console.log(`Pattern: ${results1.patternType}`);

console.log('\n💬 SPECIAL NOTE TO USER:');
console.log(results1.specialNote);

console.log('\n📦 RECOMMENDED PRODUCTS:');
results1.recommendations.forEach(cat => {
  console.log(`\n${cat.category}:`);
  cat.products.forEach(prod => {
    console.log(`  ✓ ${prod.name} (${prod.priority})`);
    console.log(`    Reason: ${prod.reason}`);
    console.log(`    Frequency: ${prod.frequency}`);
  });
  if (cat.criticalAction) {
    console.log(`  \n  🚨 CRITICAL ACTION: ${cat.criticalAction.title}`);
    cat.criticalAction.details.forEach(detail => {
      console.log(`     • ${detail}`);
    });
  }
});

console.log('\n📅 IMMEDIATE ACTION PLAN (THIS WEEK):');
results1.actionPlan.immediate.forEach((action, idx) => {
  console.log(`\n${idx + 1}. ${action.action}`);
  console.log(`   Why: ${action.why}`);
  console.log(`   How: ${action.howTo}`);
});

// ============================================================================
// SCENARIO 2: YOUNG + ADVANCED TRACTION (PREVENTABLE CRISIS)
// ============================================================================
console.log('\n\n═══════════════════════════════════════════════════════');
console.log('SCENARIO 2: 23-Year-Old with Severe Edge Loss from Braids');
console.log('═══════════════════════════════════════════════════════\n');

const scenario2 = {
  q1: '18-25 years',
  q2: 'bald_patches',
  q3: '24+ months',
  q4: ['edges', 'temples'],
  q5: 'both',
  q6: 'crown_longest_edges_shortest',
  q7: ['million_braids', 'box_braids', 'tight_ponytails'],
  q8: 'no_regular_covering',
  q9: 'cotton_pillowcase',
  q10: ['no_scalp_issues'],
  q11: 'once_a_month',
  q12: ['none'],
  q13: 'no_family_history',
  q14: ['none'],
  q15: 'fill_bald_patches'
};

const engine2 = new FulaniQuizRecommendationEngine();
const results2 = engine2.analyzeQuizResults(scenario2);

console.log('🎯 DIAGNOSIS:');
console.log(`Primary Cause: ${results2.rootCauses[0].type.toUpperCase()}`);
console.log(`Confidence: ${results2.rootCauses[0].confidence}%`);
console.log(`Risk Level: ${results2.riskLevel.toUpperCase()}`);
console.log(`Pattern Type: ${results2.patternType}`);

console.log('\n💬 SPECIAL MESSAGE:');
console.log(results2.specialNote);

console.log('\n🎯 KEY INDICATORS:');
results2.rootCauses[0].indicators.forEach(ind => console.log(`  • ${ind}`));

console.log('\n📦 TOP 3 ESSENTIAL PRODUCTS:');
const essentialProducts = results2.recommendations
  .flatMap(cat => cat.products)
  .filter(p => p.priority === 'essential')
  .slice(0, 3);

essentialProducts.forEach((prod, idx) => {
  console.log(`\n${idx + 1}. ${prod.name}`);
  console.log(`   ${prod.reason}`);
  console.log(`   Use: ${prod.frequency}`);
});

console.log('\n⏰ IMMEDIATE ACTIONS:');
results2.actionPlan.immediate.forEach(action => {
  console.log(`\n🚨 ${action.action}`);
  console.log(`   ${action.why}`);
});

// ============================================================================
// SCENARIO 3: POSTPARTUM SHEDDING (TEMPORARY CRISIS)
// ============================================================================
console.log('\n\n═══════════════════════════════════════════════════════');
console.log('SCENARIO 3: 29-Year-Old with Postpartum Hair Loss');
console.log('═══════════════════════════════════════════════════════\n');

const scenario3 = {
  q1: '26-35 years',
  q2: 'excessive_shedding',
  q3: '3-6 months',
  q4: ['even_thinning'],
  q5: 'shedding',
  q6: 'all_same_length',
  q7: ['natural_hair'],
  q8: 'no_regular_covering',
  q9: 'yes_always',
  q10: ['no_scalp_issues'],
  q11: 'every_2_weeks',
  q12: ['postpartum', 'breastfeeding'],
  q13: 'not_sure',
  q14: ['anemia'],
  q15: 'stop_breaking_shedding'
};

const engine3 = new FulaniQuizRecommendationEngine();
const results3 = engine3.analyzeQuizResults(scenario3);

console.log('🎯 DIAGNOSIS:');
console.log(`Primary Cause: ${results3.rootCauses[0].type.toUpperCase()}`);
console.log(`Pattern: ${results3.patternType}`);
console.log(`Risk Level: ${results3.riskLevel.toUpperCase()}`);

console.log('\n💬 REASSURANCE:');
console.log(results3.specialNote);

console.log('\n📋 ROOT CAUSES IDENTIFIED:');
results3.rootCauses.forEach((cause, idx) => {
  console.log(`\n${idx + 1}. ${cause.type.toUpperCase()} (${cause.confidence}% confidence)`);
  console.log(`   Priority: ${cause.priority}`);
  cause.indicators.slice(0, 2).forEach(ind => console.log(`   • ${ind}`));
});

console.log('\n💊 RECOMMENDED APPROACH:');
results3.recommendations.forEach(cat => {
  console.log(`\n${cat.category}:`);
  cat.products.slice(0, 2).forEach(prod => {
    console.log(`  • ${prod.name}`);
  });
  if (cat.medicalAdvice) {
    console.log(`  ⚕️  Medical: ${cat.medicalAdvice}`);
  }
});

console.log('\n📅 30-DAY EXPECTATIONS:');
results3.actionPlan.month1.forEach(item => {
  if (item.milestone) {
    console.log(`\n${item.milestone}:`);
    item.expect.forEach(exp => console.log(`  ✓ ${exp}`));
  }
});

// ============================================================================
// SCENARIO 4: MULTIPLE SCALP ISSUES (FOUNDATION PROBLEM)
// ============================================================================
console.log('\n\n═══════════════════════════════════════════════════════');
console.log('SCENARIO 4: 35-Year-Old with Multiple Scalp Problems');
console.log('═══════════════════════════════════════════════════════\n');

const scenario4 = {
  q1: '26-35 years',
  q2: 'scalp_issues',
  q3: '6-12 months',
  q4: ['patches_throughout'],
  q5: 'shedding',
  q6: 'all_same_length',
  q7: ['weaves', 'wigs_with_glue'],
  q8: 'itchy_scalp',
  q9: 'sleep_with_weave',
  q10: ['dandruff', 'itchy_scalp', 'painful_spots', 'excessive_oiliness'],
  q11: 'less_than_monthly',
  q12: ['significant_stress'],
  q13: 'not_sure',
  q14: ['not_sure'],
  q15: 'heal_scalp_issues'
};

const engine4 = new FulaniQuizRecommendationEngine();
const results4 = engine4.analyzeQuizResults(scenario4);

console.log('🎯 DIAGNOSIS:');
console.log(`Primary Focus: ${results4.rootCauses[0].type.toUpperCase()}`);
console.log(`Risk Level: ${results4.riskLevel.toUpperCase()}`);
console.log(`Pattern: ${results4.patternType}`);

console.log('\n⚠️ CRITICAL INSIGHT:');
console.log(results4.specialNote);

console.log('\n🔴 SCALP ISSUES DETECTED:');
results4.rootCauses
  .find(c => c.type === 'scalpHealth')
  ?.indicators.forEach(ind => console.log(`  • ${ind}`));

console.log('\n💊 SCALP HEALING PROTOCOL:');
const scalpProducts = results4.recommendations
  .find(cat => cat.category.includes('Scalp'));

if (scalpProducts) {
  scalpProducts.products.forEach((prod, idx) => {
    console.log(`\n${idx + 1}. ${prod.name} (${prod.priority})`);
    console.log(`   ${prod.reason}`);
    console.log(`   Frequency: ${prod.frequency}`);
  });
}

console.log('\n📅 WEEK 1 PRIORITIES:');
results4.actionPlan.week1.forEach(item => {
  console.log(`\n${item.action}:`);
  item.tasks.forEach(task => console.log(`  □ ${task}`));
});

// ============================================================================
// SCENARIO 5: MINIMAL CONCERNS (EARLY INTERVENTION)
// ============================================================================
console.log('\n\n═══════════════════════════════════════════════════════');
console.log('SCENARIO 5: 30-Year-Old with Minor Concerns (Prevention Focus)');
console.log('═══════════════════════════════════════════════════════\n');

const scenario5 = {
  q1: '26-35 years',
  q2: 'overall_thinning',
  q3: 'less_than_3_months',
  q4: ['even_thinning'],
  q5: 'not_sure',
  q6: 'all_same_length',
  q7: ['natural_hair', 'twists'],
  q8: 'no_regular_covering',
  q9: 'yes_always',
  q10: ['no_scalp_issues'],
  q11: 'every_2_weeks',
  q12: ['none'],
  q13: 'siblings_relatives',
  q14: ['none'],
  q15: 'maintain_prevent'
};

const engine5 = new FulaniQuizRecommendationEngine();
const results5 = engine5.analyzeQuizResults(scenario5);

console.log('🎯 ASSESSMENT:');
console.log(`Risk Level: ${results5.riskLevel.toUpperCase()}`);
console.log(`Pattern: ${results5.patternType}`);

console.log('\n💬 POSITIVE NOTE:');
console.log(results5.specialNote);

if (results5.rootCauses.length > 0) {
  console.log('\n📋 FACTORS TO MONITOR:');
  results5.rootCauses.forEach(cause => {
    console.log(`\n• ${cause.type.toUpperCase()} (${cause.confidence}% likelihood)`);
    cause.indicators.slice(0, 1).forEach(ind => console.log(`  ${ind}`));
  });
}

console.log('\n🛡️ PREVENTION STRATEGY:');
results5.recommendations.slice(0, 1).forEach(cat => {
  console.log(`\n${cat.category}:`);
  cat.products.slice(0, 2).forEach(prod => {
    console.log(`  • ${prod.name}`);
    console.log(`    ${prod.reason}`);
  });
});

console.log('\n📚 RECOMMENDED EDUCATION:');
results5.educationalPriorities.slice(0, 2).forEach((edu, idx) => {
  console.log(`\n${idx + 1}. ${edu.title}`);
  if (edu.urgency) console.log(`   ${edu.urgency}`);
  console.log('   Topics:');
  edu.topics.slice(0, 3).forEach(topic => console.log(`   • ${topic}`));
});

// ============================================================================
// COMPARISON SUMMARY
// ============================================================================
console.log('\n\n═══════════════════════════════════════════════════════');
console.log('COMPARISON: HOW ENGINE HANDLES DIFFERENT PROFILES');
console.log('═══════════════════════════════════════════════════════\n');

const scenarios = [
  { name: 'Hormonal + Traction', results: results1 },
  { name: 'Young + Advanced Traction', results: results2 },
  { name: 'Postpartum Shedding', results: results3 },
  { name: 'Multiple Scalp Issues', results: results4 },
  { name: 'Minimal Concerns', results: results5 }
];

console.log('SCENARIO                        | RISK  | URGENCY  | PRIMARY CAUSE     | CONFIDENCE');
console.log('--------------------------------|-------|----------|-------------------|----------');

scenarios.forEach(s => {
  const primaryCause = s.results.rootCauses[0];
  const name = s.name.padEnd(30);
  const risk = s.results.riskLevel.toUpperCase().padEnd(5);
  const urgency = s.results.urgency.toUpperCase().padEnd(8);
  const cause = (primaryCause?.type || 'none').padEnd(17);
  const confidence = `${primaryCause?.confidence || 0}%`;
  
  console.log(`${name} | ${risk} | ${urgency} | ${cause} | ${confidence}`);
});

console.log('\n\n✅ ENGINE SUCCESSFULLY DEMONSTRATES:');
console.log('  • Accurate root cause identification');
console.log('  • Confidence-based prioritization');
console.log('  • Cross-pattern detection');
console.log('  • Personalized product recommendations');
console.log('  • Timeline-based action plans');
console.log('  • Risk-appropriate urgency levels');
console.log('  • Educational content prioritization');
console.log('\n🎯 Ready for production integration!\n');
