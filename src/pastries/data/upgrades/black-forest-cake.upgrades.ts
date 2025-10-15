import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const BLACK_FOREST_CAKE_UPGRADES: PastryUpgrade[] = [
  {
    id: 2701,
    name: 'Layered Cherry Filling',
    description: 'Rich cherry layers add irresistible flavor. Black Forest Cake sells for +100% more!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(1.8, 24), // x10
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 2702,
    name: 'Chocolate Shaving Delight',
    description: 'A mountain of chocolate shavings doubles the price again. +100% Black Forest Cake sell value!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(4.5, 24), // x25
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 2703,
    name: 'Prestige Cake Craze',
    description: 'Luxury cake trend boosts all pastries. Global sell price increases by +50%!',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.5,
    cost: new BigNum(7.2, 24), // x40
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 2704,
    name: 'Decadent Reflection',
    description: 'The richness of this cake inspires wisdom. Life Lesson Boost increased by +1%!',
    type: PastryUpgradeType.LifeLessonBoost,
    value: 1,
    cost: new BigNum(1.44, 25), // x80
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 2705,
    name: 'Fully Automated Cake Assembly',
    description: 'Robotic precision ensures endless production. Black Forest Cake is now automated!',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(1.8, 25), // x100
    purchased: false,
    levelRequirement: 100,
  },
];
