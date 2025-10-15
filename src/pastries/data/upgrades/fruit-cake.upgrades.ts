import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const FRUIT_CAKE_UPGRADES: PastryUpgrade[] = [
  {
    id: 1801,
    name: "Festive Frenzy",
    description: "Holiday cheer spreads across the bakery! All pastries sell for 50% more.",
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.5,
    cost: new BigNum(1.5, 13), // ~15T
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 1802,
    name: "Sugared Harmony",
    description: "A balanced sweetness enhances every pastry’s flavor — global sales up another 50%.",
    type: PastryUpgradeType.GlobalSellMultiplier,
    value: 1.5,
    cost: new BigNum(4.5, 13), // ~45T
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 1803,
    name: "Dried Fruit Boost",
    description: "Infused energy from sun-dried fruits. +5% Critical Chance Increase!",
    type: PastryUpgradeType.CriticalChanceIncrease,
    value: 0.05,
    cost: new BigNum(1.5, 14), // ~150T
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 1804,
    name: "Candied Acceleration",
    description: "Candied fruit mixtures inspire faster baking worldwide — another 25% global speed.",
    type: PastryUpgradeType.GlobalSpeedMultiplier,
    value: 1.25,
    cost: new BigNum(6, 14), // ~600T
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 1805,
    name: "Automatic Holiday Line",
    description: "The bakery’s seasonal machine handles fruit cake orders autonomously, year-round.",
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(2.5, 15), // ~2.5Q
    purchased: false,
    levelRequirement: 100,
  },
];
