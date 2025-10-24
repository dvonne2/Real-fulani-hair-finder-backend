import app from './app';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import { Product } from './models';

dotenv.config();

const PORT = Number(process.env.PORT || 8000);

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
    await sequelize.sync();
    console.log('Database synchronized.');

    // Seed products if empty
    const count = await Product.count();
    if (count === 0) {
      await Product.bulkCreate([
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
      ] as any[]);
      console.log('Seeded initial products.');
    }
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }

  app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
}

start();
