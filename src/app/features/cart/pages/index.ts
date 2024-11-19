import { Component } from '@angular/core';
import { CartListing } from '../components/cart.listing';
@Component({
  standalone: true,
  template: `<cart-listing />`,
  imports: [CartListing],
})
export class CartPage {}
