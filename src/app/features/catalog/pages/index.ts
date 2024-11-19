import { Component } from '@angular/core';
import { CatalogListing } from '../components/catalog.listing';
@Component({
  standalone: true,
  template: `<catalog-listing />`,
  imports: [CatalogListing],
})
export class CatalogPage {}
