import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const GARLIC_BREAD_UPGRADES: PastryUpgrade[] = [
  {
    id: 1601,
    name: 'Triple Butter Glaze',
    description: 'A rich, golden glaze triples the value of every slice sold. x3 to sell price.',
    type: PastryUpgradeType.SellMultiplier,
    value: 3,
    cost: new BigNum(2, 10), // ~2B
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 1602,
    name: 'Aroma Diffusion System',
    description:
      'Your ovens release a tantalizing scent that boosts all pastry sales by 50%.',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.5,
    cost: new BigNum(8, 10), // ~8B
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 1603,
    name: 'Neighborhood Cravings',
    description:
      'The irresistible garlic scent wafts across town — global sales rise another 50%.',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.5,
    cost: new BigNum(2.5, 11), // ~25B
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 1604,
    name: 'Culinary Enlightenment',
    description:
      'Perfecting the art of garlic bread grants +1 bonus Life Lesson upon retirement.',
    type: PastryUpgradeType.LifeLessonBonus,
    value: 1,
    cost: new BigNum(9, 11), // ~90B
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 1605,
    name: 'Autonomous Bread Factory',
    description:
      'Automated ovens, butter injectors, and slicers handle every loaf on their own.',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(3.5, 12), // ~350B
    purchased: false,
    levelRequirement: 100,
  },
];
