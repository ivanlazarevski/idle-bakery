import { computed, effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BigNum } from '@pastries/data/bignum.util';
import { Pastry, PastryUpgrade, PastryUpgradeType } from '@pastries/data/pastry.type';
import { PASTRIES } from '@pastries/data/pastries.data';
import { MusicService } from '../music/music.service';
import { Sfx } from '../music/sfx.enum';
import { PersistenceService } from '@pastries/persistence.service';

@Injectable({
  providedIn: 'root',
})
export class GameStore {
  private musicService = inject(MusicService);
  private persistenceService = inject(PersistenceService);

  public money = signal(new BigNum(0, 0));
  public pastries = signal<Pastry[]>([]);
  public bonusLifeLessons = signal(0);
  public lifeLessons = signal(0);
  public globalSellMultiplier = signal(1);
  public globalSpeedMultiplier = signal(1);
  public lifeLessonsBoost = signal(0);

  public totalPastryLevels = computed(() =>
    this.pastries().reduce((sum, p) => sum + p.level, 0),
  );
  public pastriesSoldMap = signal<Map<number, number>>(new Map());
  public totalPastriesSold = computed(() => {
    let total = 0;
    for (const [key, value] of this.pastriesSoldMap()) {
      total += value;
    }
    return total;
  });
  public potentialLifeLessons = computed(() => {
    return Math.floor(this.totalPastryLevels() / this.lifeLessonsFactor) + this.bonusLifeLessons();
  });

  public readonly lifeLessonsFactor = 250;
  public readonly lifeLessonsMultiplier = 0.1;
  private automationInterval: any = null;
  public pastryProgress = new Map<number, WritableSignal<number>>();

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
    this.persistenceService.loadState(this);

    // auto-save whenever money or pastries change
    effect(() => {
      this.money();
      this.pastries();
      this.persistenceService.saveState(this);
    });

    this.pastries().forEach((p) => {
      if (!this.pastryProgress.has(p.id)) {
        this.pastryProgress.set(p.id, signal(0));
      }
    });

    this.startAutomationLoop();
  }

  public addMoney(amount: BigNum): void {
    this.money.update((m) => BigNum.add(m, amount));
  }

  private spendMoney(cost: BigNum): boolean {
    const current = this.money();
    if (BigNum.compare(current, cost) >= 0) {
      this.money.set(BigNum.subtract(current, cost));
      return true;
    }
    return false;
  }

  public buyUpgrade(pastryId: number, upgradeId: number): void {
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

  public applyUpgrade(p: Pastry, upgrade: PastryUpgrade): Pastry {
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
      case PastryUpgradeType.LifeLessonBoost:
        console.log('ASD!@#');
        this.lifeLessonsBoost.set(this.lifeLessonsBoost() + upgrade.value);
        break;
      case PastryUpgradeType.LifeLessonBonus:
        this.bonusLifeLessons.update((prev) => prev + upgrade.value);
        break;

    }

    this.musicService.playSfxSound(Sfx.UPGRADE);
    return updated;
  }

  public getNextCost(p: Pastry): BigNum {
    // compute multiplier^level as a JS number (may lose precision at extreme levels,
    // but it is capped by Vigintillion, so it's acceptable for now)
    const multiplierPow = Math.pow(p.costMultiplier, p.level);
    return BigNum.multiply(p.baseCost, new BigNum(multiplierPow, 0));
  }

  public getEarnings(p: Pastry): BigNum {
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

    // apply prestige multiplier: +10% per life lesson
    const prestigeMultiplier = 1 + this.lifeLessons() * (this.lifeLessonsMultiplier + this.lifeLessonsBoost());
    return BigNum.multiply(
      withGlobalMultiplier,
      new BigNum(prestigeMultiplier, 0),
    );
  }

  public clearSave(): void {
    this.persistenceService.resetState(this);
  }

  public updateLifeLessons(): void {
    // Earn 1 life lesson per 500 levels
    const earnedLessons = Math.floor(this.totalPastryLevels() / this.lifeLessonsFactor) + this.bonusLifeLessons();
    this.lifeLessons.update((prev) => prev + earnedLessons);
  }

  public startAutomationLoop(intervalMs = 50): void {
    if (this.automationInterval) return;

    let lastTick = Date.now();

    this.automationInterval = setInterval(() => {
      const now = Date.now();
      const deltaMs = now - lastTick;
      lastTick = now;

      this.pastries().forEach((p) => {
        if (!p.automation) return;

        const progressSignal = this.pastryProgress.get(p.id);
        if (!progressSignal) return;

        const increment =
          (deltaMs /
            (p.baseBuildTime /
              ((p.speedMultiplier ?? 1) * this.globalSpeedMultiplier()))) *
          100;

        let newProgress = progressSignal() + increment;
        while (newProgress >= 100) {
          const earned = this.getEarnings(p);
          this.addMoney(earned);
          newProgress -= 100; // subtract instead of reset, handles overflow
        }

        progressSignal.set(newProgress);
      });
    }, intervalMs);
  }

  public hasEnoughMoney(cost: BigNum): boolean {
    return BigNum.compare(this.money(), cost) >= 0;
  }

  public levelUpBulk(pastryId: number, count: number): void {
    this.pastries.update((list) =>
      list.map((p) => {
        if (p.id !== pastryId) return p;

        let newPastry = { ...p };
        let unlocked = false;

        for (let i = 0; i < count; i++) {
          const cost = this.getNextCost(newPastry);
          if (!this.spendMoney(cost)) break; // stop if you can’t afford

          // Handle unlock sound only once
          if (newPastry.level === 0 && !unlocked) {
            this.musicService.playSfxSound(Sfx.UNLOCK);
            unlocked = true;
          }

          newPastry = { ...newPastry, level: newPastry.level + 1 };
        }

        return newPastry;
      }),
    );
  }

  // Achievements

  incrementPastrySold(pastryId: number, amount: number = 1) {
    this.pastriesSoldMap.update((map) => {
      const current = map.get(pastryId) ?? 0;
      map.set(pastryId, current + amount);
      return map;
    });
  }
}
