import { BigNum } from '@pastries/data/bignum.util';
import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';

export const DUMPLINGS_UPGRADES: PastryUpgrade[] = [
  {
    id: 1501,
    name: "Grandma’s Secret Filling",
    description: "A timeless family recipe rediscovered — your dumplings sell for double the price. +100% to their sell price.",
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(2, 10), // ~2B
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 1502,
    name: "Handcrafted Perfection",
    description: "Each dumpling is hand-folded with flawless precision. +100% to their sell price.",
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(8, 10), // ~8B
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 1503,
    name: "High-Pressure Steamer",
    description: "An industrial steamer cooks batches twice as fast without compromising taste.",
    type: PastryUpgradeType.SpeedMultiplier,
    value: 2,
    cost: new BigNum(2.5, 11), // ~25B
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 1504,
    name: "Global Distribution Chain",
    description: "Your logistics network speeds up. +25% increased global build speed.",
    type: PastryUpgradeType.GlobalSpeedMultiplier,
    value: 0.25,
    cost: new BigNum(9, 11), // ~90B
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 1505,
    name: "Automated Dumpling Line",
    description: "Robotic arms fold, steam, and plate dumplings flawlessly, no human touch required.",
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(3.5, 12), // ~350B
    purchased: false,
    levelRequirement: 100,
  },
];
