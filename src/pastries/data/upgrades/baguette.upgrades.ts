import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const BAGUETTE_UPGRADES: PastryUpgrade[] = [
  {
    id: 301,
    name: 'Crispy Crust',
    description:
      'A perfectly baked crust that makes Baguettes irresistible, +100% to their sell price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(2.5, 3),
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 302,
    name: 'Master Baker Marketing',
    description:
      'Promote all pastries globally, boosts global sell multiplier by 50%!',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.5,
    cost: new BigNum(6.25, 3),
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 303,
    name: 'Faster Kneading',
    description:
      'An improved kneading technique, Baguettes now bake twice as fast!',
    type: PastryUpgradeType.SpeedMultiplier,
    value: 2,
    cost: new BigNum(10, 3),
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 304,
    name: 'Self-Baking Oven',
    description: 'Your Baguette oven now works automatically, day and night!',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(20, 3),
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 305,
    name: 'Caraway Seeds',
    description:
      'Caraway seeds sprinkled on top complete Baguettes. +5% critical chance!',
    type: PastryUpgradeType.CriticalChanceIncrease,
    value: 0.05,
    cost: new BigNum(25, 3),
    purchased: false,
    levelRequirement: 100,
  },
];
