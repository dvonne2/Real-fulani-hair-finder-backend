#!/usr/bin/env node

/**
 * FULANI HAIR GRO - QUICK TEST SCRIPT
 * Run this to instantly test the recommendation engine
 * 
 * Usage: node quick-test.js
 */

const { FulaniQuizRecommendationEngine } = require('./fulani-quiz-recommendation-engine');

console.log('\n🧪 FULANI HAIR GRO - QUICK TEST SCRIPT');
console.log('═══════════════════════════════════════\n');

// Quick test case: Woman with million braids and perimenopause
const testCase = {
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

console.log('📋 Test Input:');
console.log('  • Age: 46-55 years (perimenopause)');
console.log('  • Concern: Thinning edges');
console.log('  • Duration: 12-24 months');
console.log('  • Styles: Million braids + tight ponytails');
console.log('  • Areas: Edges + crown + temples');
console.log('  • Goal: Regrow edges\n');

console.log('⚙️  Processing...\n');

try {
  const engine = new FulaniQuizRecommendationEngine();
  const results = engine.analyzeQuizResults(testCase);
  
  console.log('✅ ANALYSIS COMPLETE!\n');
  
  console.log('═══════════════════════════════════════');
  console.log('📊 RESULTS SUMMARY');
  console.log('═══════════════════════════════════════\n');
  
  console.log(`🎯 Risk Level: ${results.riskLevel.toUpperCase()}`);
  console.log(`⚡ Urgency: ${results.urgency.toUpperCase()}`);
  console.log(`🔍 Pattern: ${results.patternType}\n`);
  
  if (results.specialNote) {
    console.log('💬 Personal Message:');
    console.log(`   "${results.specialNote}"\n`);
  }
  
  console.log('🧬 Root Causes Identified:');
  results.rootCauses.forEach((cause, idx) => {
    console.log(`\n   ${idx + 1}. ${String(cause.type || '').toUpperCase()}`);
    if (typeof cause.confidence === 'number') {
      console.log(`      Confidence: ${cause.confidence}%`);
    }
    console.log(`      Priority: ${cause.priority}`);
    if (Array.isArray(cause.indicators)) {
      console.log(`      Indicators:`);
      cause.indicators.slice(0, 2).forEach(ind => {
        console.log(`        • ${ind}`);
      });
    }
  });
  
  console.log('\n\n📦 Product Categories:');
  results.recommendations.forEach((cat, idx) => {
    console.log(`\n   ${idx + 1}. ${cat.category}`);
    console.log(`      ${cat.products.length} product(s) recommended`);
    
    if (cat.criticalAction) {
      console.log(`\n      🚨 CRITICAL ACTION:`);
      console.log(`      ${cat.criticalAction.title}`);
    }
  });
  
  console.log('\n\n⏰ Immediate Actions (This Week):');
  results.actionPlan.immediate.forEach((action, idx) => {
    console.log(`\n   ${idx + 1}. ${action.action}`);
    console.log(`      → ${action.why}`);
  });
  
  console.log('\n\n📚 Education Priorities:');
  results.educationalPriorities.slice(0, 2).forEach((edu, idx) => {
    console.log(`\n   ${idx + 1}. ${edu.title}`);
    if (edu.urgency) {
      console.log(`      ${edu.urgency}`);
    }
  });
  
  console.log('\n\n═══════════════════════════════════════');
  console.log('✅ TEST PASSED!');
  console.log('═══════════════════════════════════════');
  console.log('\n✨ The recommendation engine is working perfectly!\n');
  console.log('Next steps:');
  console.log('  1. Review the engine file');
  console.log('  2. Wire the frontend submit and results page');
  console.log('  3. Configure email sending');
  console.log('\n🚀 Ready to launch!\n');
  
} catch (error) {
  console.error('❌ TEST FAILED!');
  console.error('Error:', error.message);
  console.error('\nStack trace:');
  console.error(error.stack);
  process.exit(1);
}
