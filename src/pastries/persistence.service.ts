import { Injectable } from '@angular/core';
import { GameStore } from '@pastries/game.store';
import { BigNum } from '@pastries/data/bignum.util';
import { Pastry, PastryUpgradeType } from '@pastries/data/pastry.type';

const SAVE_KEY = 'bakery_save_v1';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  saveState(store: GameStore): void {
    try {
      const payload = {
        money: store.money().toObject(),
        lifeLessons: store.lifeLessons(),
        globalSellMultiplier: store.globalSellMultiplier(),
        globalSpeedMultiplier: store.globalSpeedMultiplier(),
        bonusLifeLessons: store.bonusLifeLessons(),
        lifeLessonsBoost: store.lifeLessonsBoost(),
        criticalChance: store.criticalChance(),
        criticalMultiplier: store.criticalMultiplier(),
        pastries: store.pastries().map((p) => ({
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

  loadState(store: GameStore): void {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);

      // Restore money
      if (parsed?.money) {
        store.money.set(BigNum.fromObject(parsed.money));
      }

      // Restore global multipliers
      if (parsed?.globalSellMultiplier != null) {
        store.globalSellMultiplier.set(parsed.globalSellMultiplier);
      }
      if (parsed?.globalSpeedMultiplier != null) {
        store.globalSpeedMultiplier.set(parsed.globalSpeedMultiplier);
      }
      if (parsed?.bonusLifeLessons != null) {
        store.bonusLifeLessons.set(parsed.bonusLifeLessons);
      }
      if (parsed?.lifeLessonsBoost != null) {
        store.lifeLessonsBoost.set(parsed.lifeLessonsBoost);
      }
      if (parsed?.criticalChance != null) {
        store.criticalChance.set(parsed.criticalChance);
      }
      if (parsed?.criticalMultiplier != null) {
        store.criticalMultiplier.set(parsed.criticalMultiplier);
      }

      // Restore life lessons
      if (parsed?.lifeLessons != null && !isNaN(Number(parsed.lifeLessons))) {
        store.lifeLessons.set(Math.floor(Number(parsed.lifeLessons)));
      }

      // Restore pastries
      if (Array.isArray(parsed?.pastries)) {
        const savedMap = new Map<number, any>();
        for (const p of parsed.pastries) {
          if (typeof p.id === 'number') {
            savedMap.set(p.id, p);
          }
        }

        store.pastries.update((list) =>
          list.map((p) => {
            const saved = savedMap.get(p.id);
            if (!saved) return p;

            // Merge upgrades (set purchased flag from save)
            const mergedUpgrades = p.upgrades.map((u) => {
              const savedUpgrade = saved.upgrades?.find(
                (su: any) => su.id === u.id,
              );
              return savedUpgrade
                ? { ...u, purchased: !!savedUpgrade.purchased }
                : u;
            });

            // Build pastry with saved core properties
            let merged: Pastry = {
              ...p,
              level: saved.level ?? p.level,
              sellMultiplier: 1, // upgrades will re-apply reset to defaults
              speedMultiplier: 1,
              automation: false,
              upgrades: mergedUpgrades,
            };

            // Re-apply purchased upgrades (skip global multipliers)
            for (const u of mergedUpgrades) {
              if (u.purchased) {
                if (
                  u.type !== PastryUpgradeType.GlobalSellMultiplier &&
                  u.type !== PastryUpgradeType.GlobalSpeedMultiplier &&
                  u.type !== PastryUpgradeType.LifeLessonBoost &&
                  u.type !== PastryUpgradeType.CriticalChanceIncrease &&
                  u.type !== PastryUpgradeType.CriticalMultiplierIncrease
                ) {
                  merged = store.applyUpgrade(merged, u);
                }
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

  resetState(store: GameStore): void {
    // Remove saved data
    localStorage.removeItem(SAVE_KEY);

    // Reset money and life lessons
    store.money.set(new BigNum(0, 0));
    store.updateLifeLessons(); // assuming this recalculates based on total levels

    // Reset global multipliers
    store.globalSellMultiplier.set(store.baseGlobalSellMultiplier);
    store.globalSpeedMultiplier.set(store.baseGlobalSpeedMultiplier);
    store.criticalChance.set(store.baseCriticalChance);
    store.criticalMultiplier.set(store.baseCriticalMultiplier);

    store.bonusLifeLessons.set(0);
    store.lifeLessonsBoost.set(0);

    // Reset pastries
    store.pastries.update((list) =>
      list.map((p) => {
        // Reset upgrades
        const resetUpgrades = p.upgrades.map((u) => ({
          ...u,
          purchased: false,
        }));

        // Reset core properties
        const resetPastry: Pastry = {
          ...p,
          level: p.id === 1 ? 1 : 0, // unlock the first pastry by default
          sellMultiplier: 1,
          speedMultiplier: 1,
          automation: false,
          upgrades: resetUpgrades,
        };

        // Reset progress signal if it exists
        const progressSignal = store.pastryProgress.get(p.id);
        if (progressSignal) progressSignal.set(0);

        return resetPastry;
      }),
    );

    // Refresh page (if desired)
    window.location.reload();
  }
}
