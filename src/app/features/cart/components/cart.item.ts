import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../services/cart.service';
@Component({
  standalone: true,
  selector: 'cart-item',
  styleUrl: 'cart.item.css',
  template: ` <div>
    <div class="cart-item">
      <img
        [ngSrc]="image"
        [alt]="title"
        class="cart-item-image"
        width="80"
        height="80"
      />
      <div class="cart-item-details">
        <h3 class="cart-item-title">{{ title }}</h3>
        <p class="cart-item-price">Price: {{ price | currency }}</p>
        <div class="cart-item-quantity">
          <label for="quantity">Qty:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            (input)="updateItem(id, $event)"
            [value]="quantity"
          />
        </div>
        <p class="cart-item-price">Total: {{ quantity * price | currency }}</p>
      </div>
      <div class="cart-item-actions">
        <button class="cart-item-remove" (click)="removeItem(id)">
          Remove
        </button>
      </div>
    </div>
  </div>`,
  imports: [NgOptimizedImage, CurrencyPipe],
})
export class CartItem {
  @Input() id: number = 0;
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() quantity: number = 0;
  constructor(private cartService: CartService) {}
  removeItem(id: number) {
    this.cartService.removeItem(id);
  }
  updateItem(id: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let qty: number = parseInt(inputElement.value, 10);
    this.cartService.updateItem(id, qty);
  }
}
