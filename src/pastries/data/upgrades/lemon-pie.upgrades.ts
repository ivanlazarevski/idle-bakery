import { PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { BigNum } from '@pastries/data/bignum.util';

export const LEMON_PIE_UPGRADES: PastryUpgrade[] = [
  {
    id: 1701,
    name: "Extra Zest",
    description: "A burst of lemon zest. +100% sell price!",
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(1.8, 13), // ~18T
    purchased: false,
    levelRequirement: 10,
  },
  {
    id: 1702,
    name: "Golden Crust",
    description: "A perfected baking process adds another +100% sell price!",
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(6, 13), // ~60T
    purchased: false,
    levelRequirement: 25,
  },
  {
    id: 1703,
    name: "Whipped Perfection",
    description: "Silky meringue topping doubles sales again with its perfect sweetness. +100% sell price!",
    type: PastryUpgradeType.SellMultiplier,
    value: 2,
    cost: new BigNum(2.2, 14), // ~220T
    purchased: false,
    levelRequirement: 50,
  },
  {
    id: 1704,
    name: "Citrus Efficiency",
    description: "Refined preparation methods double production speed.",
    type: PastryUpgradeType.SpeedMultiplier,
    value: 2,
    cost: new BigNum(8, 14), // ~800T
    purchased: false,
    levelRequirement: 75,
  },
  {
    id: 1705,
    name: "Automated Patisserie",
    description: "Self-slicing, auto-glazing lemon pie stations run flawlessly without your input.",
    type: PastryUpgradeType.Automation,
    value: 1,
    cost: new BigNum(3, 15), // ~3Q
    purchased: false,
    levelRequirement: 100,
  },
];
