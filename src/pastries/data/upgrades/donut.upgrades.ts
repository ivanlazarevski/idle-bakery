import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const DONUT_UPGRADES: PastryUpgrade[] = [
  {
    id: 401,
    name: 'Glazed Delight',
    description:
      'A shiny sugar glaze that makes your Donuts irresistible. +100% to their sell price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(10, 3),
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 402,
    name: 'Sprinkle Storm',
    description:
      'Colorful sprinkles that melt hearts. +100% to their sell price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(25, 3),
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 403,
    name: 'Hyper Mixer',
    description:
      'An upgraded mixer speeds up all baking. Global speed of all pastries increased +50% !',
    type: PastryUpgradeType.GlobalSpeedMultiplier,
    value: 1.5,
    cost: new BigNum(40, 3),
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 404,
    name: 'Sweet Marketing Campaign',
    description:
      'Promote pastries far and wide. Global sell multiplier increased by 50%!',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.50,
    cost: new BigNum(80, 3),
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 405,
    name: 'Donut Robot',
    description: 'Your very own donut-making robot. Donuts bake automatically!',
    type: PastryUpgradeType.Automation,
    value: 1, // enables automation
    cost: new BigNum(100, 3),
    purchased: false,
    levelRequirement: 100,
  },
];
