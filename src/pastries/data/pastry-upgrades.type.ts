import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const BREAD_UPGRADES: PastryUpgrade[] = [
  {
    id: 101,
    name: "Better Flour",
    description: "Switch to higher quality flour, doubling bread loaf value.",
    type: PastryUpgradeType.SellMultiplier,
    value: 2, // +100%
    cost: new BigNum(1, 1), // 10
    purchased: false,
    levelRequirement: 2,
  },
  {
    id: 102,
    name: "Golden Crust",
    description: "A crispy golden crust makes loaves twice as valuable.",
    type: PastryUpgradeType.SellMultiplier,
    value: 2, // +100%
    cost: new BigNum(2, 1), // 1.5K
    purchased: false,
    levelRequirement: 4,
  },
  {
    id: 103,
    name: "Secret Family Recipe",
    description: "Adds irresistible flavor, doubling bread loaf sell price.",
    type: PastryUpgradeType.SellMultiplier,
    value: 2, // +100%
    cost: new BigNum(3, 1), // 20K
    purchased: false,
    levelRequirement: 6,
  },
  {
    id: 104,
    name: "Conveyor Oven",
    description: "Automated oven halves the baking time.",
    type: PastryUpgradeType.SpeedMultiplier,
    value: 2, // speed x2 (half the time)
    cost: new BigNum(4, 1), // 100K
    purchased: false,
    levelRequirement: 8,
  },
  {
    id: 105,
    name: "Self-Slicing Bread Machine",
    description: "Loaves bake and sell automatically.",
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(5, 1), // 1M
    purchased: false,
    levelRequirement: 10,
  },
];
