import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const PAVLOVA_CAKE_UPGRADES: PastryUpgrade[] = [
  {
    id: 2801,
    name: 'Crisp Meringue Perfection',
    description: 'A flawless meringue doubles the value. Pavlova Cake sells for +100% more!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(3.4, 28), // x10
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 2802,
    name: 'Fresh Berry Crown',
    description: 'A crown of fresh berries boosts demand. another +100% Pavlova Cake sell value!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(8.5, 28), // x25
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 2803,
    name: 'Sweet Legacy',
    description: 'The elegance of Pavlova leaves a lasting mark. Gain +1 Life Lesson upon retirement.',
    type: PastryUpgradeType.LifeLessonBonus,
    value: 1,
    cost: new BigNum(1.36, 29), // x40
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 2804,
    name: 'Elegant Insight',
    description: 'Mastering Pavlova brings clarity. Life Lesson Boost increased by +1%!',
    type: PastryUpgradeType.LifeLessonBoost,
    value: 1,
    cost: new BigNum(2.72, 29), // x80
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 2805,
    name: 'Celestial Baking Automaton',
    description: 'An ethereal machine takes over. Pavlova Cake is now automated!',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(3.4, 29), // x100
    purchased: false,
    levelRequirement: 100,
  },
];
