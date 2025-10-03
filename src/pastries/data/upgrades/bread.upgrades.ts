import { PastryUpgrade, PastryUpgradeType } from '../pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const BREAD_UPGRADES: PastryUpgrade[] = [
  {
    id: 101,
    name: 'Better Flour',
    description: 'Switch to higher quality flour, +100% bread loaf value.',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(5, 1),
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 102,
    name: 'Golden Crust',
    description: 'A crispy golden crust makes loaves +100% more valuable.',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(12.5, 1),
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 103,
    name: 'Secret Family Recipe',
    description:
      'Adds irresistible flavor, adding +100% to bread loaf sell price.',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(25, 1),
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 104,
    name: 'Conveyor Oven',
    description: 'Automated oven halves the baking time.',
    type: PastryUpgradeType.SpeedMultiplier,
    value: 2,
    cost: new BigNum(4, 2),
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 105,
    name: 'Self-Slicing Bread Machine',
    description: 'Loaves bake and sell automatically.',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(1, 3),
    purchased: false,
    levelRequirement: 100,
  },
];
