import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const TART_UPGRADES: PastryUpgrade[] = [
  {
    id: 1101,
    name: 'Glazed Perfection',
    description:
      'A mirror glaze so shiny it draws crowds from miles away. All pastries sell for 50% more.',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.5,
    cost: new BigNum(1, 8), // 100M * 10 = 1B
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 1102,
    name: 'Royal Presentation',
    description:
      'Presented on golden plates with intricate latticework, your pastries fetch higher prices everywhere. +50% to all pastries sell price.',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.5,
    cost: new BigNum(2.5, 8), // 100M * 25 = 2.5B
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 1103,
    name: 'Secret Family Recipe',
    description:
      'The legendary recipe passes through generations, enchanting customers and boosting global sales by 50%.',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.5,
    cost: new BigNum(4, 8), // 100M * 40 = 4B
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 1104,
    name: 'Aroma of Luxury',
    description:
      'The sweet scent of your Tarts fills the entire town, drawing in buyers and raising all pastry sales by 50%.',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.5,
    cost: new BigNum(8, 8), // 100M * 80 = 8B
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 1105,
    name: 'Self-Filling Tart Shells',
    description:
      'The Tarts have mastered themselves — they fill and bake without your touch. Automation unlocked.',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(1, 9), // 100M * 100 = 10B
    purchased: false,
    levelRequirement: 100,
  },
];
