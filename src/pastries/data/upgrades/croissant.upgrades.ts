import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const CROISSANT_UPGRADES: PastryUpgrade[] = [
  {
    id: 201,
    name: 'Golden Glaze',
    description:
      'A luxurious glaze that makes your Croissants irresistible. +100% to their sell price!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(500, 0),
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 202,
    name: 'Chocolate Drizzle',
    description:
      'Rich chocolate swirls that melt hearts. Croissant sell for +100%!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(12.5, 2),
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 203,
    name: 'Almond Sprinkle',
    description:
      'Sprinkled almonds for extra crunch and charm. Increase their sell price by +100%!',
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(2, 3),
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 204,
    name: 'Faster Folding',
    description:
      'Masterful folding technique speeds up baking. Croissants now bake twice as fast!',
    type: PastryUpgradeType.SpeedMultiplier,
    value: 2,
    cost: new BigNum(4, 3),
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 205,
    name: 'Automated Oven',
    description:
      'A magical self-baking oven that never tires. Croissants bake automatically!',
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(5, 3),
    purchased: false,
    levelRequirement: 100,
  },
];
