import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const PUDDING_UPGRADES: PastryUpgrade[] = [
  {
    id: 2401,
    name: 'Velvet Caramel Layer',
    description: 'A silky caramel layer makes every serving richer — Pudding sells for +100% more!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(1.4, 22), // x10
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 2402,
    name: 'Golden Custard Swirl',
    description: 'A swirl of golden custard doubles pudding value again — +100% sell price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(3.5, 22), // x25
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 2403,
    name: 'Royal Dessert Garnish',
    description: 'A decadent garnish fit for royalty — another +100% Pudding sell increase!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(5.6, 22), // x40
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 2404,
    name: 'Luscious Flavor Burst',
    description: 'Each bite explodes with flavor — Crit Multiplier increased by +25%!',
    type: PastryUpgradeType.CriticalMultiplierIncrease,
    value: 1.25,
    cost: new BigNum(1.12, 23), // x80
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 2405,
    name: 'Pudding Dispenser Unit',
    description: 'A fully automated dispenser ensures Pudding production never stops — Automation unlocked!',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(1.4, 23), // x100
    purchased: false,
    levelRequirement: 100,
  },
];
