import { Component } from '@angular/core';
import { CatalogListing } from '../components/catalog.listing';
import { Loader } from '../../../shared/components/loader';
@Component({
  standalone: true,
  template: `
    @defer{
    <catalog-listing />
    } @placeholder (minimum 500ms) {
    <loader />
    }
  `,
  imports: [CatalogListing, Loader],
})
export class CatalogPage {}
