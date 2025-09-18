import { BigNum } from './bignum.util';

export type Pastry = {
  id: number;
  name: string;
  image: string;
  rank: number;
  level: number;
  baseBuildTime: number; // ms
  upgrades: PastryUpgrade[];
  baseRevenue: BigNum; // earnings per build
  baseCost: BigNum; // cost of the first unit
  costMultiplier: number; // exponential growth rate for future units
  sellMultiplier: number; // multiplies revenue for this pastry (default 1)
  speedMultiplier: number; // multiplies the speed of building (default 1)
  automation: boolean; // true if this pastry auto-builds
};

export enum PastryUpgradeType {
  SellMultiplier = 'sellMultiplier',
  SpeedMultiplier = 'speedMultiplier',
  Automation = 'automation',
}

export type PastryUpgrade = {
  id: number; // unique identifier
  name: string; // display name
  description: string; // short description for tooltip/UI
  type: PastryUpgradeType; // type of upgrade
  value: number; // multiplier or flag (1 for automation)
  cost: BigNum; // cost to purchase
  purchased: boolean; // whether this upgrade has been bought
  levelRequirement: number;
};
