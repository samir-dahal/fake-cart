import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItemModel } from '../models/cart.item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { CartItem } from './cart.item';
@Component({
  standalone: true,
  selector: 'cart-listing',
  template: `
    <div *ngIf="grandTotal$ | async as grandTotal" class="grand-total">
      <h3>Grand Total: {{ grandTotal | currency }}</h3>
    </div>
    <div
      *ngIf="totalItemsCount$ | async as totalItemsCount"
      class="grand-total"
    >
      <h3>Total Items: {{ totalItemsCount }}</h3>
    </div>
    <div *ngIf="cartItems$ | async as cartItems">
      <ng-container *ngIf="cartItems.length; else noItems">
        <button (click)="clearCart()">Clear Cart</button>
        <cart-item
          *ngFor="let item of cartItems"
          [id]="item.id"
          [title]="item.title"
          [image]="item.image"
          [quantity]="item.quantity"
          [price]="item.price"
        />
      </ng-container>
    </div>
    <ng-template #noItems>
      No items in your cart :(
      <a routerLink="/products">Continue Shopping?</a>
    </ng-template>
  `,
  imports: [NgFor, NgIf, AsyncPipe, CurrencyPipe, CartItem, RouterLink],
})
export class CartListing {
  public cartItems$: Observable<CartItemModel[]>;
  public grandTotal$: Observable<number>;
  public totalItemsCount$: Observable<number>;
  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getItems$();
    this.totalItemsCount$ = this.cartItems$.pipe(map((items) => items.length));
    this.grandTotal$ = this.cartItems$.pipe(
      map((items) =>
        items.reduce((total, item) => total + item.quantity * item.price, 0)
      )
    );
  }
  clearCart() {
    if (!confirm('Are you sure?')) return;
    this.cartService.clearCart();
  }
}
