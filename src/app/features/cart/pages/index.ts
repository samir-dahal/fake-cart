import { Component } from '@angular/core';
import { CartListing } from '../components/cart.listing';
import { Loader } from '../../../shared/components/loader';
import { RouterLink } from '@angular/router';
@Component({
  standalone: true,
  template: `
    <h2>Your Cart Items</h2>
    <a routerLink="/products">Go Back</a>
    @defer{
    <cart-listing />
    } @placeholder(minimum 250ms) {
    <loader />
    }
  `,
  imports: [CartListing, Loader, RouterLink],
})
export class CartPage {}
