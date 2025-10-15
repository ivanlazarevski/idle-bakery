import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const CROQUEMBOUCHE_UPGRADES: PastryUpgrade[] = [
  {
    id: 2901,
    name: 'Caramel Cascade',
    description: 'A golden caramel coating draws crowds. Croquembouche sells for +150% more!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2.5,
    cost: new BigNum(1.2, 29), // x10
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 2902,
    name: 'Tower of Temptation',
    description: 'An even taller tower impresses customers. Another +150% Croquembouche sell value!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2.5,
    cost: new BigNum(3, 29), // x25
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 2903,
    name: 'Sugared Wisdom',
    description: 'The art of Croquembouche baking deepens your insight. Life Lesson Boost increased by +1%!',
    type: PastryUpgradeType.LifeLessonBoost,
    value: 1,
    cost: new BigNum(4.8, 29), // x40
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 2904,
    name: 'Culinary Prestige',
    description: 'Your pastry becomes world-renowned. +50% GLOBAL sell price to all pastries!',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.5,
    cost: new BigNum(9.6, 29), // x80
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 2905,
    name: 'Royal Pastry Automaton',
    description: 'A regal machine assembles Croquembouche endlessly. Automation unlocked!',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(1.2, 30), // x100
    purchased: false,
    levelRequirement: 100,
  },
];
