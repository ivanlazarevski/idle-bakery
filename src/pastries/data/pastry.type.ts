import {BigNum} from './bignum.util';

export type Pastry = {
  id: number;
  name: string;
  image: string;
  rank: number;
  level: number;
  baseBuildTime: number;   // ms
  updates: string[];
  baseRevenue: BigNum;     // earnings per build
  baseCost: BigNum;        // cost of the first unit
  costMultiplier: number;  // exponential growth rate for future units
}
