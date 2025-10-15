import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const STRAWBERRY_CAKE_UPGRADES: PastryUpgrade[] = [
  {
    id: 2001,
    name: 'Fresh Strawberry Glaze',
    description: 'A sweet glaze coats the cake — Strawberry Cake sells for +100% more!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(3.2, 16), // x10
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 2002,
    name: 'Whipped Cream Delight',
    description: 'A fluffy layer of whipped cream doubles the sell price again — +100% Strawberry Cake sell value!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(8, 16), // x25
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 2003,
    name: 'Glittering Sugar Dust',
    description: 'A sparkling sugar dusting boosts sales — +100% Strawberry Cake sell price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(1.28, 17), // x40
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 2004,
    name: 'Festival Cake Craze',
    description: 'Strawberry Cakes become a worldwide trend — +50% GLOBAL sell price!',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.5,
    cost: new BigNum(2.56, 17), // x80
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 2005,
    name: 'Automated Cake Frosting Machine',
    description: 'A high-tech frosting machine takes over — Strawberry Cake production is now automated!',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(3.2, 17), // x100
    purchased: false,
    levelRequirement: 100,
  },
];
