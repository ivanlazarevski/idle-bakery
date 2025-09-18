import { Component, inject } from '@angular/core';
import { GameStore } from '@pastries/game.store';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public store = inject(GameStore);
  public money = this.store.money;

  clearStorage() {
    this.store.clearSave();
  }
}
