import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItemModel } from '../models/cart.item.model';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems$ = new BehaviorSubject<CartItemModel[]>([]);
  items: CartItemModel[] = [];
  public addToCart(cartItem: CartItemModel): void {
    let item: CartItemModel | undefined = this.items.find(
      (x) => x.id == cartItem.id
    );
    if (item) {
      item.quantity++;
    } else {
      this.items.push(cartItem);
    }
    this.cartItems$.next(this.items);
  }
  public getItems$(): Observable<CartItemModel[]> {
    return this.cartItems$;
  }
  public removeItem(id: number): void {
    this.items = this.items.filter((x) => x.id != id);
    this.cartItems$.next(this.items);
  }
  public updateItem(id: number, qty: number) {
    let item: CartItemModel | undefined = this.items.find((x) => x.id == id);
    if (item && qty > 0) {
      item.quantity = qty;
      this.cartItems$.next(this.items);
    }
  }
  public clearCart(): void {
    this.items = [];
    this.cartItems$.next(this.items);
  }
}
