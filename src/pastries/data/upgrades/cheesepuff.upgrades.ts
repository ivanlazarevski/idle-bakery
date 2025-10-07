import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const CHEESE_PUFF_UPGRADES: PastryUpgrade[] = [
  {
    id: 601,
    name: 'Cheddar Boost',
    description:
      'Enhance the flavor with aged cheddar. +100% to Cheese Puff sell price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(1000, 3), // 100k * 10
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 602,
    name: 'Gourmet Cheese Mix',
    description:
      'A luxurious blend of cheeses raises the value of each Cheese Puff. +100% sell price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(2.5, 4), // 100k * 25 = 2,500k
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 603,
    name: 'Secret Cheese Recipe',
    description:
      'A mysterious secret recipe doubles the Cheese Puff’s appeal! +100% sell price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(4, 4), // 100k * 40 = 4,000k
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 604,
    name: 'Turbo Mixer',
    description:
      'An advanced mixer doubles the production speed of Cheese Puffs!',
    type: PastryUpgradeType.SpeedMultiplier,
    value: 2,
    cost: new BigNum(8, 4), // 100k * 80 = 8,000k
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 605,
    name: 'Cheese Puff Automaton',
    description: 'Your very own automated Cheese Puff machine bakes endlessly!',
    type: PastryUpgradeType.Automation,
    value: 1, // enables automation
    cost: new BigNum(1, 5), // 100k * 100 = 10,000k
    purchased: false,
    levelRequirement: 100,
  },
];
