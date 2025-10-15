import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const CINNAMON_ROLL_UPGRADES: PastryUpgrade[] = [
  {
    id: 1001,
    name: "Sticky Sweetness",
    description: "A thicker layer of caramelized sugar doubles the value of every Cinnamon Roll. +100% to their sell price.",
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(150, 6), // 150M
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 1002,
    name: "Extra Glaze",
    description: "A glossy sugar glaze makes your rolls irresistible. +100% to their sell price.",
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(375, 6), // 375M
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 1003,
    name: "Golden Swirl",
    description: "Premium cinnamon spice creates a golden swirl. +100% to their sell price.",
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(600, 6), // 600M
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 1004,
    name: "Sweet Wisdom",
    description: "Every roll baked teaches a timeless lesson. +1 bonus life lesson at retirement.",
    type: PastryUpgradeType.LifeLessonBonus,
    value: 1,
    cost: new BigNum(1.2, 9), // 1.2B
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 1005,
    name: "Self-Rolling Dough Machine",
    description: "The dough now rolls itself, automating Cinnamon Roll production.",
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(1.5, 9), // 1.5B
    purchased: false,
    levelRequirement: 100,
  },
];
