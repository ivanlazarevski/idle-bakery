import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const WEDDING_CAKE_UPGRADES: PastryUpgrade[] = [
  {
    id: 3001,
    name: 'Elegant Sugar Lace',
    description: 'Delicate sugar lace attracts premium buyers — Wedding Cake sells for +100% more!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(2.5, 31), // x10
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 3002,
    name: 'Diamond Fondant Finish',
    description: 'A shimmering fondant coat doubles the price again — another +100% Wedding Cake sell value!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(6.25, 31), // x25
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 3003,
    name: 'Royal Tier Expansion',
    description: 'An extra tier impresses high-class clients — +100% Wedding Cake sell price once more!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(1, 32), // x40
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 3004,
    name: 'Ceremonial Enlightenment',
    description: 'The artistry of Wedding Cake crafting deepens your insight. Life Lesson Boost increased by +1%!',
    type: PastryUpgradeType.LifeLessonBoost,
    value: 1,
    cost: new BigNum(2, 32), // x80
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 3005,
    name: 'Promise of Legacy',
    description: 'Each cake marks a memory of mastery. Gain +1 Life Lesson when retiring!',
    type: PastryUpgradeType.LifeLessonBonus,
    value: 1,
    cost: new BigNum(2.5, 32), // x100
    purchased: false,
    levelRequirement: 100,
  },
];
