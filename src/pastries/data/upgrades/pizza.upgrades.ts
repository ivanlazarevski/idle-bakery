import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const PIZZA_UPGRADES: PastryUpgrade[] = [
  {
    id: 2601,
    name: 'Extra Cheese Boost',
    description: 'A gooey layer of extra cheese doubles the price. Pizza sells for +100% more!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(2.5, 24), // x10
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 2602,
    name: 'Stone Oven Perfection',
    description: 'Baked in a traditional stone oven. Another +100% Pizza sell value!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(6.25, 24), // x25
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 2603,
    name: 'Gourmet Toppings Selection',
    description: 'Premium toppings attract foodies everywhere. +100% Pizza sell boost once again!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(1, 25), // x40
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 2604,
    name: 'High-Heat Turbo Bake',
    description: 'Industrial ovens cut bake time drastically. Pizza bakes twice as fast! (Speed x2)',
    type: PastryUpgradeType.SpeedMultiplier,
    value: 2,
    cost: new BigNum(2, 25), // x80
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 2605,
    name: 'Automated Pizza Slicer',
    description: 'Robotic slicers handle production flawlessly. Pizza is now automated!',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(2.5, 25), // x100
    purchased: false,
    levelRequirement: 100,
  },
];
