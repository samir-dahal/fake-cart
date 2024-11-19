import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Catalog } from './catalog';
import { FormsModule } from '@angular/forms';
import { ProductResponse } from '../contracts/responses/product.response';
import { RouterLink } from '@angular/router';
import { CartService } from '../../cart/services/cart.service';
import { Observable, Subscription } from 'rxjs';
import { CartItemModel } from '../../cart/models/cart.item.model';
import { takeUntil } from 'rxjs/operators';
@Component({
  standalone: true,
  selector: 'catalog-listing',
  styleUrl: './catalog.listing.css',
  template: `
    <div class="catalog-listing">
      @if(keyword.length){
      <h2>Results for '{{ keyword }}'</h2>
      } @if(cartItemsCount > 0){
      <h2>Cart Items: {{ cartItemsCount }}</h2>
      }
      <input
        type="search"
        class="search"
        (keyup)="onSearch()"
        (search)="onSearch()"
        [(ngModel)]="keyword"
      />
      <a role="button" routerLink="/cart">View Cart</a>
      <button type="button" (click)="resetSearch()">Reset Search</button>
      <div class="grid">
        @for(product of products; track product.id){
        <catalog
          [id]="product.id"
          [title]="product.title"
          [image]="product.image"
          [category]="product.category"
          [price]="product.price"
        />
        }
      </div>
    </div>
  `,
  imports: [Catalog, FormsModule, RouterLink],
})
export class CatalogListing implements OnInit, OnDestroy {
  products: ProductResponse[] = [];
  productSource: ProductResponse[] = [];
  keyword: string = '';
  cartItemsCount: number = 0;
  subscription: Subscription | undefined;
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService
      .getAll()
      .subscribe((products) => (this.products = this.productSource = products));

    this.subscription = this.cartService
      .getItems$()
      .subscribe((items) => (this.cartItemsCount = items.length));
  }

  onSearch(): void {
    this.products = this.productSource.filter((p) =>
      p.title.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  resetSearch(): void {
    this.keyword = '';
    this.products = this.productSource;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
