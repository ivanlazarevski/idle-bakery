import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const ECLAIR_UPGRADES: PastryUpgrade[] = [
  {
    id: 901,
    name: 'Chocolate Coating',
    description: 'Rich chocolate glaze doubles the value of each Éclair.',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(25, 6), // 25M
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 902,
    name: 'Cream Filling',
    description: 'Extra cream boosts the worth of Éclairs. +100% to their sell price.',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(6.25, 7), // 62.5M
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 903,
    name: 'Global Craze',
    description: 'Éclairs take the world by storm. Global sell multiplier +25%.',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.25,
    cost: new BigNum(1, 8), // 100M
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 904,
    name: 'Whipped Speed',
    description: 'Streamlined baking doubles Éclair production speed.',
    type: PastryUpgradeType.SpeedMultiplier,
    value: 2,
    cost: new BigNum(2, 8), // 200M
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 905,
    name: 'Éclair Automaton',
    description: 'Specialized ovens automate Éclair production.',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(2.5, 8), // 250M
    purchased: false,
    levelRequirement: 100,
  },
];
