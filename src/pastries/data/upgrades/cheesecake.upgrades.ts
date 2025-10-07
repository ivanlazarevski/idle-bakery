import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const CHEESECAKE_UPGRADES: PastryUpgrade[] = [
  {
    id: 1201,
    name: "Velvet Cream Topping",
    description: "A silky layer of cream adds irresistible richness. Cheesecake slices now sell for double the price!",
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(8, 8), // 800M * 10 = 8B
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 1202,
    name: "Berry Symphony",
    description: "A vibrant mix of berries elevates every bite. Customers happily pay twice as much!",
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(2, 9), // 800M * 25 = 20B
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 1203,
    name: "Golden Crust Perfection",
    description: "The crust shimmers with golden flakes — a masterpiece of indulgence. Cheesecake price doubled again!",
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(3.2, 9), // 800M * 40 = 32B
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 1204,
    name: "Baker’s Reflection",
    description: "Each slice reminds you of your journey and mastery. Gain +1 Life Lesson when you retire.",
    type: PastryUpgradeType.LifeLessonBonus,
    value: 1,
    cost: new BigNum(6.4, 9), // 800M * 80 = 64B
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 1205,
    name: "Self-Baking Cheesecake Oven",
    description: "Your cheesecakes now bake themselves with perfect timing. Automation unlocked.",
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(8, 9), // 800M * 100 = 80B
    purchased: false,
    levelRequirement: 100,
  },
];
