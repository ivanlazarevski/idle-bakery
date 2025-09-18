import { Component, inject } from '@angular/core';
import { GameStore } from '@pastries/game.store';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  public store = inject(GameStore);
  public money = this.store.money;
}
