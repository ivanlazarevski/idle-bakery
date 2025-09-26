import { inject, Injectable, Signal, signal } from '@angular/core';
import { GLOBAL_ACHIEVEMENTS } from './achievement-lists/global.achievements';
import { Achievement, AchievementRequirementType } from './achievements.type';
import { BREAD_ACHIEVEMENTS } from './achievement-lists/bread.achievements';
import { CROISSANT_ACHIEVEMENTS } from './achievement-lists/croissant.achievements';
import { GameStore } from '@pastries/game.store';

@Injectable({
  providedIn: 'root',
})
export class AchievementsService {
  private store = inject(GameStore);

  private _achievements = signal<Achievement[]>([
    ...BREAD_ACHIEVEMENTS,
    ...CROISSANT_ACHIEVEMENTS,
    ...GLOBAL_ACHIEVEMENTS,
  ]);

  achievements: Signal<Achievement[]> = this._achievements.asReadonly();

  checkAchievements(pastryId?: number) {
    const pastrySoldCount =
      pastryId != null ? (this.store.pastriesSoldMap().get(pastryId) ?? 0) : 0;
    const totalSold = this.store.totalPastriesSold();

    this._achievements.update((list) =>
      list.map((ach) => {
        if (ach.fulfilled) return ach;

        switch (ach.requirementType) {
          case AchievementRequirementType.PastriesSold:
            if (
              pastryId != null &&
              ach.pastryId === pastryId &&
              pastrySoldCount >= ach.requirementValue
            ) {
              return { ...ach, fulfilled: true };
            }
            break;

          case AchievementRequirementType.TotalPastriesSold:
            if (totalSold >= ach.requirementValue) {
              return { ...ach, fulfilled: true };
            }
            break;
        }
        return ach;
      }),
    );
  }
}
