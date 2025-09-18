import { Component, inject } from '@angular/core';
import { GameStore } from '@pastries/game.store';
import { MatButtonModule } from '@angular/material/button';
import { GenericDialog } from '@components/generic-dialog/generic-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatTooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public store = inject(GameStore);
  public money = this.store.money;
  readonly dialog = inject(MatDialog);

  clearStorage() {
    this.store.clearSave();
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(GenericDialog, {
      width: '250px',
      data: {
        title: 'Are you sure?',
        message: 'This will clear your save data.',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clearStorage();
        alert('Save data cleared.');
      }
    });
  }
}
