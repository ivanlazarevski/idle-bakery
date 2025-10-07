import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const CHOCOLATE_CAKE_UPGRADES: PastryUpgrade[] = [
  {
    id: 1401,
    name: "Rich Cocoa Blend",
    description: "Imported cocoa from the finest regions gives your cakes unmatched depth. +100% to sell price.",
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(5, 10), // ~10x base = 500B
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 1402,
    name: "Velvet Ganache Frosting",
    description: "A silky chocolate ganache coats every layer perfectly. +100% to sell price",
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(2, 11), // ~4T
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 1403,
    name: "Gilded Chocolate Shavings",
    description: "Edible gold flakes adorn each slice, making it a luxury item. +100% to sell price.",
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(8, 11), // ~80T
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 1404,
    name: "Philosopher’s Recipe",
    description: "After years of experimentation, your chocolate cake has become a symbol of mastery. Gain +1 Life Lesson upon retirement.",
    type: PastryUpgradeType.LifeLessonBonus,
    value: 1,
    cost: new BigNum(2.5, 12), // ~250T
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 1405,
    name: "Fully Automated Bakery",
    description: "An army of confectionery robots now bakes and decorates cakes flawlessly on their own.",
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(7.5, 12), // ~750T
    purchased: false,
    levelRequirement: 100,
  },
];
