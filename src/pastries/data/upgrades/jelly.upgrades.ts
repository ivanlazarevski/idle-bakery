import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const JELLY_UPGRADES: PastryUpgrade[] = [
  {
    id: 2301,
    name: 'Sugary Glaze',
    description: 'Coats the jelly in a glossy sugar shell. Increases Jelly sale price by **+100%**.',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(2200, 18), // 220 * 10
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 2302,
    name: 'Premium Filling',
    description: 'Infuses the jelly with high-grade filling. Increases Jelly sale price by **+100%**.',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(5500, 18), // 220 * 25
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 2303,
    name: 'Golden Jelly Batch',
    description: 'A legendary batch with pure sweetness. Increases Jelly sale price by **+100%**.',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(8800, 18), // 220 * 40
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 2304,
    name: 'Sticky Precision',
    description: 'A perfect jelly mold increases efficiency. **+1% Critical Chance** globally.',
    type: PastryUpgradeType.CriticalChanceIncrease,
    value: 0.01,
    cost: new BigNum(17600, 18), // 220 * 80
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 2305,
    name: 'Jelly Auto-Dispenser',
    description: 'Automates jelly production with perfect timing. **Automatically produces and sells Jelly.**',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(22000, 18), // 220 * 100
    purchased: false,
    levelRequirement: 100,
  },
];
