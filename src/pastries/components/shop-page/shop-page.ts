import { Component, inject } from '@angular/core';
import { ItemComponent } from '@pastries/components/pastry-item/pastry-item';
import { GameStore } from '@pastries/game.store';

@Component({
  selector: 'shop-page',
  imports: [ItemComponent],
  templateUrl: './shop-page.html',
  styleUrl: './shop-page.scss',
})
export class ShopPage {
  public store = inject(GameStore);
  public pastryList = this.store.pastries;
  public money = this.store.money;
}
