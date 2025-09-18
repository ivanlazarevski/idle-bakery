import { Injectable, signal, effect } from '@angular/core';
import { BigNum } from '@pastries/data/bignum.util';
import { Pastry } from '@pastries/data/pastry.type';
import { PASTRIES } from '@pastries/data/pastries.data';

const SAVE_KEY = 'bakery_save_v1';

@Injectable({
  providedIn: 'root',
})
export class GameStore {
  money = signal(new BigNum(0, 0));
  pastries = signal<Pastry[]>([]); // we'll initialize in constructor

  constructor() {
    // initialize pastries as clones of the base data (so we don't mutate the original)
    const cloned = PASTRIES.map((p) => ({
      ...p,
      // clone BigNum instances so we have fresh objects per game instance
      baseRevenue: p.baseRevenue.clone(),
      baseCost: p.baseCost.clone(),
    }));
    this.pastries.set(cloned);

    // load saved state (if any)
    this.loadState();

    // auto-save whenever money or pastries change
    effect(() => {
      // read signals to subscribe
      this.money();
      this.pastries();
      this.saveState();
    });
  }

  addMoney(amount: BigNum) {
    this.money.update((m) => BigNum.add(m, amount));
  }

  spendMoney(cost: BigNum): boolean {
    const current = this.money();
    if (BigNum.compare(current, cost) >= 0) {
      this.money.set(BigNum.subtract(current, cost));
      return true;
    }
    return false;
  }

  // level up pastry if player can afford next cost
  levelUp(pastryId: number) {
    this.pastries.update((list) =>
      list.map((p) => {
        if (p.id !== pastryId) return p;

        const cost = this.getNextCost(p);
        if (!this.spendMoney(cost)) return p; // can't afford

        return { ...p, level: p.level + 1 };
      }),
    );
  }

  // price = baseCost * costMultiplier^level
  getNextCost(p: Pastry): BigNum {
    // compute multiplier^level as a JS number (may lose precision at extreme levels,
    // but you are capped by Vigintillion so it's acceptable for now)
    const multiplierPow = Math.pow(p.costMultiplier, p.level);
    return BigNum.multiply(p.baseCost, new BigNum(multiplierPow, 0));
  }

  getEarnings(p: Pastry): BigNum {
    if (p.level === 0) return new BigNum(0, 0);
    return BigNum.multiply(p.baseRevenue, new BigNum(p.level, 0));
  }

  // ---------- persistence ----------
  private saveState() {
    try {
      const payload = {
        money: this.money().toObject(),
        pastries: this.pastries().map((p) => ({ id: p.id, level: p.level })),
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Failed saving game state:', e);
    }
  }

  private loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      if (parsed?.money) {
        this.money.set(BigNum.fromObject(parsed.money));
      }

      if (Array.isArray(parsed?.pastries)) {
        // merge saved levels into current pastries
        const levelMap = new Map<number, number>();
        for (const p of parsed.pastries) {
          if (typeof p.id === 'number' && typeof p.level === 'number') {
            levelMap.set(p.id, p.level);
          }
        }

        this.pastries.update((list) =>
          list.map((p) => {
            const savedLevel = levelMap.get(p.id);
            return savedLevel != null ? { ...p, level: savedLevel } : p;
          }),
        );
      }
    } catch (e) {
      console.warn('Failed loading game state:', e);
    }
  }

  clearSave() {
    localStorage.removeItem(SAVE_KEY);
    // reset signals to defaults
    this.money.set(new BigNum(0, 0));
    // reset pastry levels to 0
    this.pastries.update((list) => list.map((p) => ({ ...p, level: 0 })));
  }
}
