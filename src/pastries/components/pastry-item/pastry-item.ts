import {
  Component,
  inject,
  input,
  signal,
  linkedSignal,
  HostListener,
  computed,
  OnInit,
  DestroyRef,
} from '@angular/core';
import { Pastry } from '@pastries/data/pastry.type';
import { GameStore } from '@pastries/game.store';
import { BigNum } from '@pastries/data/bignum.util';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MusicService } from '../../../music/music.service';
import { Sfx } from '../../../music/sfx.enum';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'pastry-item',
  templateUrl: './pastry-item.html',
  styleUrls: ['./pastry-item.scss'],
  imports: [
    MatCheckboxModule,
    MatTooltipModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class PastryItemComponent implements OnInit {
  public musicService = inject(MusicService);
  public store = inject(GameStore);
  public destroyRef = inject(DestroyRef);

  public pastry = input.required<Pastry>();

  isBuilding = signal(false);
  public collapsed = linkedSignal(() => {
    return this.pastry().level > 0;
  });

  ctrlDown = signal(false);
  shiftDown = signal(false);
  critFlashValue = signal<BigNum | null>(null);

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'ControlLeft') this.ctrlDown.set(true);
    if (event.code === 'ShiftLeft') this.shiftDown.set(true);
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.code === 'ControlLeft') this.ctrlDown.set(false);
    if (event.code === 'ShiftLeft') this.shiftDown.set(false);
  }

  bulkCount = computed(() => {
    if (this.ctrlDown()) return 10;
    if (this.shiftDown()) return 25;
    return 1;
  });

  bulkCost = computed(() => {
    const p = this.pastry();
    if (!p || p.level === 0 || this.bulkCount() === 1) {
      return this.store.getNextCost(p);
    }

    let total = new BigNum(0, 0);
    let temp = { ...p };

    for (let i = 0; i < this.bulkCount(); i++) {
      const cost = this.store.getNextCost(temp);
      total = BigNum.add(total, cost);
      temp = { ...temp, level: temp.level + 1 };
    }

    return total;
  });

  private critSubscription: Subscription;

  ngOnInit(): void {
    if (this.critSubscription) {
      this.critSubscription.unsubscribe();
    }

    this.critSubscription = this.store.critEvents$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (crit) => {
          if (crit.pastry.id === this.pastry().id) {
            this.showCritPopup(crit.value);
          }
        },
      });
  }

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
        clearInterval(timer);
        this.isBuilding.set(false);
        progressSignal.set(0);

        let earned = this.store.applyCrit(
          this.store.getEarnings(this.pastry()),
          this.pastry(),
        );

        if(earned.didCrit) {
          this.musicService.playSfxSound(Sfx.CRIT);
        } else if (source === 'click') {
          this.musicService.playSfxSound(Sfx.BUILD);
        }

        this.store.addMoney(earned.value);
      }
    }, interval);
  }

  get nextCost(): BigNum {
    return this.store.getNextCost(this.pastry());
  }

  levelUp() {
    this.store.levelUpBulk(this.pastry().id, 1);
  }

  get earnings(): BigNum {
    return this.store.getEarnings(this.pastry());
  }

  buyUpgrade(upgrade: number): void {
    this.store.buyUpgrade(this.pastry().id, upgrade);
  }

  toggleCollapse(): void {
    this.collapsed.set(!this.collapsed());
  }

  levelUpBulk(): void {
    this.store.levelUpBulk(this.pastry().id, this.bulkCount());
  }

  showCritPopup(value: BigNum): void {
    this.critFlashValue.set(value);
    setTimeout(() => this.critFlashValue.set(null), 800);
  }
}
