import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const GALETTE_UPGRADES: PastryUpgrade[] = [
  {
    id: 2501,
    name: 'Buttery Flake Perfection',
    description: 'Expert lamination doubles value — Galette sells for +100% more!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(2.5, 23), // x10
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 2502,
    name: 'Caramelized Apple Crown',
    description: 'A glossy apple topping boosts sales again — another +100% sell price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(6.25, 23), // x25
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 2503,
    name: 'Royal Pastry Glaze',
    description: 'A noble finish worthy of a king — +100% Galette sell increase once more!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(1, 24), // x40
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 2504,
    name: 'Baker’s Legacy',
    description: 'Your mastery inspires future runs — Gain +1 Life Lesson upon retirement!',
    type: PastryUpgradeType.LifeLessonBonus,
    value: 1,
    cost: new BigNum(2, 24), // x80
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 2505,
    name: 'Galette Auto-Press System',
    description: 'Precision machinery takes over production — Automation unlocked!',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(2.5, 24), // x100
    purchased: false,
    levelRequirement: 100,
  },
];
