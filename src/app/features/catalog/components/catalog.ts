import { Component, Input } from '@angular/core';
import { NgOptimizedImage, CurrencyPipe } from '@angular/common';
import { CartService } from '../../cart/services/cart.service';
import { CartItemModel } from '../../cart/models/cart.item.model';
@Component({
  standalone: true,
  selector: 'catalog',
  template: `
    <div>
      <img priority [ngSrc]="image" [alt]="title" width="200" height="200" />
      <p>{{ title }}</p>
      <small>{{ category }}</small>
      <p>{{ price | currency }}</p>
      <button
        (click)="addToCart({
      id: id,
      title: title,
      image: image,
      quantity: 1,
      price: price,
    })"
      >
        Add to Cart
      </button>
    </div>
  `,
  imports: [NgOptimizedImage, CurrencyPipe],
})
export class Catalog {
  @Input() id: number = 0;
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() category: string = '';
  @Input() price: number = 0;
  constructor(private cartService: CartService) {}
  addToCart(cartItem: CartItemModel): void {
    this.cartService.addToCart(cartItem);
  }
}
