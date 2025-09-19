import {
  computed,
  effect,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
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

  totalPastryLevels = computed(() =>
    this.pastries().reduce((sum, p) => sum + p.level, 0),
  );

  lifeLessons = signal(0);
  globalSellMultiplier = signal(1);
  globalSpeedMultiplier = signal(1);

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

  addMoney(amount: BigNum): void {
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

  buyUpgrade(pastryId: number, upgradeId: number): void {
    this.pastries.update((list) =>
      list.map((p) => {
        if (p.id !== pastryId) return p;

        // find the upgrade in this pastry
        const upgrade = p.upgrades.find((u) => u.id === upgradeId);
        if (!upgrade) return p;

        // check if already purchased or level requirement not met
        if (upgrade.purchased || p.level < upgrade.levelRequirement) return p;

        // check if the player can afford it
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
      case PastryUpgradeType.GlobalSellMultiplier:
        this.globalSellMultiplier.set(
          this.globalSellMultiplier() * upgrade.value,
        );
        break;
      case PastryUpgradeType.GlobalSpeedMultiplier:
        this.globalSpeedMultiplier.set(
          this.globalSpeedMultiplier() * upgrade.value,
        );
        break;
    }
    return updated;
  }

  // level up pastry if player can afford next cost
  levelUp(pastryId: number): void {
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
    // but it is capped by Vigintillion, so it's acceptable for now)
    const multiplierPow = Math.pow(p.costMultiplier, p.level);
    return BigNum.multiply(p.baseCost, new BigNum(multiplierPow, 0));
  }

  getEarnings(p: Pastry): BigNum {
    if (p.level === 0) {
      return new BigNum(0, 0);
    }

    // base revenue * level
    const base = BigNum.multiply(p.baseRevenue, new BigNum(p.level, 0));

    // apply pastry-specific multiplier
    const withPastryMultiplier = BigNum.multiply(
      base,
      new BigNum(p.sellMultiplier ?? 1, 0),
    );

    // apply global sell multiplier
    const withGlobalMultiplier = BigNum.multiply(
      withPastryMultiplier,
      new BigNum(this.globalSellMultiplier(), 0),
    );

    // apply prestige multiplier: +1% per life lesson
    const prestigeMultiplier = 1 + this.lifeLessons() * 0.01;
    return BigNum.multiply(
      withGlobalMultiplier,
      new BigNum(prestigeMultiplier, 0),
    );
  }

  // ---------- persistence ----------
  private saveState(): void {
    try {
      const payload = {
        money: this.money().toObject(),
        lifeLessons: this.lifeLessons(),
        globalSellMultiplier: this.globalSellMultiplier(),
        globalSpeedMultiplier: this.globalSpeedMultiplier(),
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

  private loadState(): void {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);

      // restore money
      if (parsed?.money) {
        this.money.set(BigNum.fromObject(parsed.money));
      }

      // Restore Global Sell Multiplier
      if (parsed?.globalSellMultiplier != null) {
        this.globalSellMultiplier.set(parsed.globalSellMultiplier);
      }

      // Restore Global Speed Multiplier
      if (parsed?.globalSpeedMultiplier != null) {
        this.globalSpeedMultiplier.set(parsed.globalSpeedMultiplier);
      }

      // restore lifeLessons
      if (parsed?.lifeLessons != null && !isNaN(Number(parsed.lifeLessons))) {
        this.lifeLessons.set(Math.floor(Number(parsed.lifeLessons)));
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
              sellMultiplier: 1, // upgrades will re-apply reset to defaults
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

  clearSave(): void {
    // Remove saved data
    localStorage.removeItem(SAVE_KEY);

    // Reset money
    this.money.set(new BigNum(0, 0));
    this.updateLifeLessons();

    this.globalSellMultiplier.set(1);
    this.globalSpeedMultiplier.set(1);

    // Reset pastries
    this.pastries.update((list) =>
      list.map((p) => {
        // reset upgrades
        const resetUpgrades = p.upgrades.map((u) => ({
          ...u,
          purchased: false,
        }));

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

  private updateLifeLessons(): void {
    // Earn 1 life lesson per 100 levels
    const earnedLessons = Math.floor(this.totalPastryLevels() / 100);
    this.lifeLessons.update((prev) => prev + earnedLessons);
  }

  startAutomationLoop(intervalMs = 50): void {
    if (this.automationInterval) return;

    this.automationInterval = setInterval(() => {
      this.pastries().forEach((p) => {
        if (!p.automation) return;

        const progressSignal = this.pastryProgress.get(p.id);
        if (!progressSignal) return;

        const speed = p.speedMultiplier ?? 1;
        const increment =
          (intervalMs /
            (p.baseBuildTime /
              ((p.speedMultiplier ?? 1) * this.globalSpeedMultiplier()))) *
          100;

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

  hasEnoughMoney(cost: BigNum): boolean {
    return BigNum.compare(this.money(), cost) >= 0;
  }
}
