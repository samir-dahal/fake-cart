import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItemModel } from '../models/cart.item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { CartItem } from './cart.item';
@Component({
  standalone: true,
  selector: 'cart-listing',
  template: `
    <div *ngIf="grandTotal$ | async as grandTotal" class="grand-total">
      <h3>Grand Total: {{ grandTotal | currency }}</h3>
    </div>
    <cart-item
      *ngFor="let item of cartItems$ | async"
      [id]="item.id"
      [title]="item.title"
      [image]="item.image"
      [quantity]="item.quantity"
      [price]="item.price"
    />
  `,
  imports: [NgFor, NgIf, AsyncPipe, CurrencyPipe, CartItem],
})
export class CartListing {
  public cartItems$: Observable<CartItemModel[]>;
  public grandTotal$: Observable<number>;
  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getItems$();
    this.grandTotal$ = this.cartItems$.pipe(
      map((items) =>
        items.reduce((total, item) => total + item.quantity * item.price, 0)
      )
    );
  }
}
