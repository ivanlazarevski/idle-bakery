import { Component, inject, input, signal } from '@angular/core';
import { Pastry } from '@pastries/data/pastry.type';
import { GameStore } from '@pastries/game.store';
import { BigNum } from '@pastries/data/bignum.util';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MusicService } from '../../../music/music';
import { Sfx } from '../../../music/sfx.enum';

@Component({
  selector: 'pastry-item',
  templateUrl: './pastry-item.html',
  styleUrls: ['./pastry-item.scss'],
  imports: [MatCheckboxModule, MatTooltipModule, MatBadgeModule],
})
export class PastryItemComponent {
  public pastry = input.required<Pastry>();
  public musicService = inject(MusicService);
  public store = inject(GameStore);

  isBuilding = signal(false);

  build(source: string = 'base') {
    const progressSignal = this.store.pastryProgress.get(this.pastry().id);
    if (!progressSignal || this.isBuilding()) return;
    this.isBuilding.set(true);
    progressSignal.set(0);

    const interval = 50;
    const baseTime = this.pastry().baseBuildTime;
    const speed = this.pastry().speedMultiplier ?? 1;
    const totalTime = baseTime / speed;
    const increment = (interval / totalTime) * 100;

    const timer = setInterval(() => {
      progressSignal.set(progressSignal() + increment);

      if (progressSignal() >= 100) {
        if (source === 'click') {
          this.musicService.playSfxSound(Sfx.BUILD);
        }

        clearInterval(timer);
        this.isBuilding.set(false);
        progressSignal.set(0);

        const earned = this.store.getEarnings(this.pastry());
        this.store.addMoney(earned);
      }
    }, interval);
  }

  get nextCost(): BigNum {
    return this.store.getNextCost(this.pastry());
  }

  levelUp() {
    this.store.levelUp(this.pastry().id);
  }

  get earnings(): BigNum {
    return this.store.getEarnings(this.pastry());
  }

  buyUpgrade(upgrade: number): void {
    this.store.buyUpgrade(this.pastry().id, upgrade);
  }
}
