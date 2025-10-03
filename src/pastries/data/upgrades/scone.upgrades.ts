import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const SCONE_UPGRADES: PastryUpgrade[] = [
  {
    id: 701,
    name: 'Golden Crust',
    description: 'Your scones develop a perfect golden crust, increasing their value by 100%.',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(1, 6), // 1.00M
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 702,
    name: 'Berry Delight',
    description: 'Fresh berries in every scone double their popularity. +100% increased sale price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(2.5, 6), // 2.50M
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 703,
    name: 'Clotted Cream Tradition',
    description: 'Served with clotted cream, scones become a staple for afternoon tea. +100% increased sale price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(4, 6), // 4.00M
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 704,
    name: 'Stone Oven',
    description: 'Your bakery installs a stone oven, halving scone bake time.',
    type: PastryUpgradeType.SpeedMultiplier,
    value: 2,
    cost: new BigNum(8, 6), // 8.00M
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 705,
    name: 'Scone Machine',
    description: 'An automatic scone press handles the work without your attention.',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(1, 7), // 10.0M
    purchased: false,
    levelRequirement: 100,
  },
];
