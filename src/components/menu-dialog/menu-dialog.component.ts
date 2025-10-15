import { Component, computed, inject } from '@angular/core';
import { GameStore } from '@pastries/game.store';
import { MusicService } from '../../music/music.service';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { GenericDialog } from '@components/generic-dialog/generic-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'menu-dialog',
  imports: [MatButton, MatIcon],
  templateUrl: './menu-dialog.component.html',
  styleUrl: './menu-dialog.component.scss',
})
export class MenuDialogComponent {
  public store = inject(GameStore);
  public musicService = inject(MusicService);
  readonly dialog = inject(MatDialog);

  public musicPlaying = this.musicService.musicEnabled;
  public sfxEnabled = this.musicService.sfxEnabled;
  public potentialLifeLessons = this.store.potentialLifeLessons;
  public globalSellMultiplier = this.store.globalSellMultiplier;
  public globalSpeedMultiplier = this.store.globalSpeedMultiplier;
  public lifeLessons = this.store.lifeLessons;
  public lifeLessonsMultiplier = computed(() => {
    return this.store.lifeLessonsMultiplier + this.store.lifeLessonsBoost()
  });

  public toggleMusic(): void {
    this.musicService.toggleMusic();
  }

  public openConfirmDialog(): void {
    const dialogRef = this.dialog.open(GenericDialog, {
      width: '250px',
      data: {
        title: 'Are you sure?',
        message: `If you retire now, you will lose all progress, and gain ${this.potentialLifeLessons()} life lessons.`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.clearSave();
        alert('Save data cleared.');
      }
    });
  }

  public toggleAudio(): void {
    this.musicService.toggleSfx(!this.musicService.sfxEnabled());
  }
}
