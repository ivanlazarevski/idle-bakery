import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const DANISH_PASTRY_UPGRADES: PastryUpgrade[] = [
  {
    id: 801,
    name: 'Sugared Glaze',
    description: 'A sweet glaze doubles the value of every Danish. +100% to their sell price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(4, 6), // 4.00M
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 802,
    name: 'Fruit Filling',
    description: 'Delicious fruit fillings make Danishes even more valuable. +100% to their sell price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(1, 7), // 10.0M
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 803,
    name: 'Royal Recipe',
    description: 'An old royal recipe doubles the worth of every Danish. +100% to their sell price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(1.6, 7), // 16.0M
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 804,
    name: 'Bakery Fame',
    description: 'Your Danish Pastries earn local fame. Life lessons give +1% bonus!',
    type: PastryUpgradeType.LifeLessonBoost,
    value: 0.01,
    cost: new BigNum(3.2, 7), // 32.0M
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 805,
    name: 'Danish Automaton',
    description: 'An enchanted oven bakes Danish Pastries without effort.',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(4, 7), // 40.0M
    purchased: false,
    levelRequirement: 100,
  },
];
