import { Injectable, signal, effect, Signal, WritableSignal } from '@angular/core';
import { BigNum } from '@pastries/data/bignum.util';
import {
  Pastry,
  PastryUpgrade,
  PastryUpgradeType,
} from '@pastries/data/pastry.type';
import { PASTRIES } from '@pastries/data/pastries.data';

const SAVE_KEY = 'bakery_save_v1';

@Injectable({
  providedIn: 'root',
})
export class GameStore {
  money = signal(new BigNum(0, 0));
  pastries = signal<Pastry[]>([]);

  private automationInterval: any = null;
  pastryProgress = new Map<number, WritableSignal<number>>();

  constructor() {
    // initialize pastries as clones of the base data (so we don't mutate the original)
    const cloned = PASTRIES.map((p) => ({
      ...p,
      // clone BigNum instances so we have fresh objects per game instance
      baseRevenue: p.baseRevenue.clone(),
      baseCost: p.baseCost.clone(),
      // clone upgrades deeply so we don't share references with static data
      upgrades: p.upgrades.map((u) => ({
        ...u,
        cost: u.cost.clone(),
        purchased: false, // always reset on a new game
      })),
    }));
    this.pastries.set(cloned);

    // load saved state (if any)
    this.loadState();

    // auto-save whenever money or pastries change
    effect(() => {
      this.money();
      this.pastries();
      this.saveState();
    });

    this.pastries().forEach((p) => {
      if (!this.pastryProgress.has(p.id)) {
        this.pastryProgress.set(p.id, signal(0));
      }
    });

    this.startAutomationLoop();
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

  buyUpgrade(pastryId: number, upgradeId: number) {
    this.pastries.update((list) =>
      list.map((p) => {
        if (p.id !== pastryId) return p;

        // find the upgrade in this pastry
        const upgrade = p.upgrades.find((u) => u.id === upgradeId);
        if (!upgrade) return p;

        // check if already purchased or level requirement not met
        if (upgrade.purchased || p.level < upgrade.levelRequirement) return p;

        // check if player can afford it
        if (!this.spendMoney(upgrade.cost)) return p;

        // mark upgrade as purchased
        const newUpgrades = p.upgrades.map((u) =>
          u.id === upgrade.id ? { ...u, purchased: true } : u,
        );

        // apply upgrade effect
        let updated = { ...p, upgrades: newUpgrades };
        updated = this.applyUpgrade(updated, upgrade);

        return updated;
      }),
    );
  }

  private applyUpgrade(p: Pastry, upgrade: PastryUpgrade): Pastry {
    let updated = { ...p };
    switch (upgrade.type) {
      case PastryUpgradeType.SellMultiplier:
        updated.sellMultiplier *= upgrade.value;
        break;
      case PastryUpgradeType.SpeedMultiplier:
        updated.speedMultiplier *= upgrade.value;
        break;
      case PastryUpgradeType.Automation:
        updated.automation = true;
        break;
    }
    return updated;
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
    // but you are capped by Vigintillion, so it's acceptable for now)
    const multiplierPow = Math.pow(p.costMultiplier, p.level);
    return BigNum.multiply(p.baseCost, new BigNum(multiplierPow, 0));
  }

  getEarnings(p: Pastry): BigNum {
    if (p.level === 0) return new BigNum(0, 0);

    // base revenue * level
    let earnings = BigNum.multiply(p.baseRevenue, new BigNum(p.level, 0));

    // apply sell multiplier (default 1)
    if (p.sellMultiplier && p.sellMultiplier !== 1) {
      earnings = BigNum.multiply(earnings, new BigNum(p.sellMultiplier, 0));
    }

    return earnings;
  }

  // ---------- persistence ----------
  private saveState() {
    try {
      const payload = {
        money: this.money().toObject(),
        pastries: this.pastries().map((p) => ({
          id: p.id,
          level: p.level,
          upgrades: p.upgrades.map((u) => ({
            id: u.id,
            purchased: u.purchased,
          })),
        })),
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

      // restore money
      if (parsed?.money) {
        this.money.set(BigNum.fromObject(parsed.money));
      }

      // restore pastries
      if (Array.isArray(parsed?.pastries)) {
        const savedMap = new Map<number, any>();
        for (const p of parsed.pastries) {
          if (typeof p.id === 'number') {
            savedMap.set(p.id, p);
          }
        }

        this.pastries.update((list) =>
          list.map((p) => {
            const saved = savedMap.get(p.id);
            if (!saved) return p;

            // merge upgrades (set purchased flag from save)
            const mergedUpgrades = p.upgrades.map((u) => {
              const savedUpgrade = saved.upgrades?.find(
                (su: any) => su.id === u.id,
              );
              return savedUpgrade
                ? { ...u, purchased: !!savedUpgrade.purchased }
                : u;
            });

            // build pastry with saved core properties
            let merged: Pastry = {
              ...p,
              level: saved.level ?? p.level,
              sellMultiplier: 1, // reset to defaults, will be re-applied by upgrades
              speedMultiplier: 1,
              automation: false,
              upgrades: mergedUpgrades,
            };

            // re-apply purchased upgrades to restore multipliers/automation
            for (const u of mergedUpgrades) {
              if (u.purchased) {
                merged = this.applyUpgrade(merged, u);
              }
            }

            return merged;
          }),
        );
      }
    } catch (e) {
      console.warn('Failed loading game state:', e);
    }
  }

  clearSave() {
    // Remove saved data
    localStorage.removeItem(SAVE_KEY);

    // Reset money
    this.money.set(new BigNum(0, 0));

    // Reset pastries
    this.pastries.update((list) =>
      list.map((p) => {
        // reset upgrades
        const resetUpgrades = p.upgrades.map((u) => ({ ...u, purchased: false }));

        // reset core properties
        const resetPastry: Pastry = {
          ...p,
          level: p.id === 1 ? 1 : 0,
          sellMultiplier: 1,
          speedMultiplier: 1,
          automation: false,
          upgrades: resetUpgrades,
        };

        // reset progress signal
        const progressSignal = this.pastryProgress.get(p.id);
        if (progressSignal) progressSignal.set(0);

        return resetPastry;
      }),
    );

    window.location.reload();
  }

  startAutomationLoop(intervalMs = 50) {
    if (this.automationInterval) return;

    this.automationInterval = setInterval(() => {
      this.pastries().forEach((p) => {
        if (!p.automation) return;

        const progressSignal = this.pastryProgress.get(p.id);
        if (!progressSignal) return;

        const speed = p.speedMultiplier ?? 1;
        const increment = (intervalMs / (p.baseBuildTime / speed)) * 100;

        let newProgress = progressSignal() + increment;
        if (newProgress >= 100) {
          const earned = this.getEarnings(p);
          this.addMoney(earned);
          newProgress = 0;
        }

        progressSignal.set(newProgress);
      });
    }, intervalMs);
  }
}
