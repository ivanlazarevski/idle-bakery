import { Component, computed, inject } from '@angular/core';
import { GameStore } from '@pastries/game.store';
import { MatButtonModule } from '@angular/material/button';
import { GenericDialog } from '@components/generic-dialog/generic-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MusicService } from '../../music/music.service';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MenuDialogComponent } from '@components/menu-dialog/menu-dialog.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatBadgeModule,
    NgTemplateOutlet,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private store = inject(GameStore);
  private musicService = inject(MusicService);
  readonly dialog = inject(MatDialog);
  public lifeLessonsFactor = this.store.lifeLessonsFactor;
  public musicPlaying = this.musicService.musicEnabled;
  public sfxEnabled = this.musicService.sfxEnabled;

  // Stats
  public money = this.store.money;
  public lifeLessons = this.store.lifeLessons;
  public potentialLifeLessons = this.store.potentialLifeLessons;
  public clearStorage(): void {
    this.store.clearSave();
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
        this.clearStorage();
        alert('Save data cleared.');
      }
    });
  }

  public toggleMusic(): void {
    this.musicService.toggleMusic();
  }

  public toggleAudio(): void {
    this.musicService.toggleSfx(!this.musicService.sfxEnabled());
  }

  public toggleMenu(): void {
    const menuDialog = this.dialog.open(MenuDialogComponent, {});
  }
}
