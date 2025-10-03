import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const BAGEL_UPGRADES: PastryUpgrade[] = [
  {
    id: 501,
    name: 'Social Media Buzz',
    description:
      'A viral social media campaign makes all pastries more desirable. Global sell multiplier +25%!',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.1,
    cost: new BigNum(40, 3),
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 502,
    name: 'Celebrity Endorsement',
    description:
      'Famous chefs praise your pastries, increasing their value everywhere. Global sell multiplier +25%!',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.15,
    cost: new BigNum(80, 3),
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 503,
    name: 'National Advertising',
    description:
      'Billboards and TV spots make pastries a household name. Global sell multiplier +25%!',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.2,
    cost: new BigNum(160, 3),
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 504,
    name: 'International Fame',
    description:
      'Your pastries are loved worldwide. Global sell multiplier +25%!',
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.25,
    cost: new BigNum(320, 3),
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 505,
    name: 'Legendary management',
    description:
      'Your bakery becomes legendary. Bagel production is automated.',
    type: PastryUpgradeType.Automation,
    value: 1.3,
    cost: new BigNum(400, 3),
    purchased: false,
    levelRequirement: 100,
  },
];
