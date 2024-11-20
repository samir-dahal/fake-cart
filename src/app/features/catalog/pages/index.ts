import { Component } from '@angular/core';
import { CatalogListing } from '../components/catalog.listing';
@Component({
  standalone: true,
  template: `
    <h2>Fake Cart</h2>
    <catalog-listing />
  `,
  imports: [CatalogListing],
})
export class CatalogPage {}
