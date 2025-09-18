import { Component, inject, signal, input } from '@angular/core';
import { Pastry } from '@pastries/data/pastry.type';
import { GameStore } from '@pastries/game.store';
import { BigNum } from '@pastries/data/bignum.util';

@Component({
  selector: 'pastry-item',
  templateUrl: './pastry-item.html',
  styleUrls: ['./pastry-item.scss'],
})
export class ItemComponent {
  public pastry = input.required<Pastry>();
  private store = inject(GameStore);

  isBuilding = signal(false);
  progress = signal(0);

  build() {
    if (this.isBuilding()) return;

    this.isBuilding.set(true);
    this.progress.set(0);

    const interval = 50;
    const totalTime = this.pastry().baseBuildTime;
    const increment = (interval / totalTime) * 100;

    const timer = setInterval(() => {
      this.progress.update((p) => p + increment);
      if (this.progress() >= 100) {
        clearInterval(timer);
        this.isBuilding.set(false);
        this.progress.set(0);

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
}
