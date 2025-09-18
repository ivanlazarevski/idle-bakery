import { Component, inject, signal, input } from '@angular/core';
import { Pastry, PastryUpgrade } from '@pastries/data/pastry.type';
import { GameStore } from '@pastries/game.store';
import { BigNum } from '@pastries/data/bignum.util';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'pastry-item',
  templateUrl: './pastry-item.html',
  styleUrls: ['./pastry-item.scss'],
  imports: [MatCheckboxModule, MatTooltipModule],
})
export class PastryItemComponent {
  public pastry = input.required<Pastry>();
  public store = inject(GameStore);
  public progress = this.store.pastryProgress;

  isBuilding = signal(false);

  build() {
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
