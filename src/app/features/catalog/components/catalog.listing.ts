import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Catalog } from './catalog';
import { FormsModule } from '@angular/forms';
import { ProductResponse } from '../contracts/responses/product.response';
@Component({
  standalone: true,
  selector: 'catalog-listing',
  styleUrl: './catalog.listing.css',
  template: `
  <div class="catalog-listing">
    @if(keyword.length){
      <h2>Results for '{{keyword}}'</h2>
    }
    <input type="search" class="search" 
          (keyup)="onSearch()" 
          (search)="onSearch()" 
          [(ngModel)]="keyword"/>
    <button type="button">View Cart</button>
    <button type="button" (click)="resetSearch()">Reset Search</button>
    <div class="grid">
      @for(product of products; track product.id){
        <catalog 
          [title]="product.title"
          [image]="product.image"
          [category]="product.category"
          [price]="product.price"/>
      }
    </div>
  </div>
  `,
  imports: [Catalog, FormsModule],
})
export class CatalogListing implements OnInit {
  constructor(private productService: ProductService) {}
  products: ProductResponse[] = [];
  productSource: ProductResponse[] = [];
  keyword: string = '';
  ngOnInit(): void {
    this.productService
      .getAll()
      .subscribe((products) => (this.products = this.productSource = products));
  }
  onSearch(): void{
    this.products = this.productSource
        .filter(p => p.title.toLowerCase().includes(this.keyword.toLowerCase()));
  }
  resetSearch(): void{
    this.keyword = '';
    this.products = this.productSource;
  }
}
