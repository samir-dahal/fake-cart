import {Routes} from '@angular/router';
import { CatalogListing } from '../components/catalog.listing';
export const catalogRoutes: Routes = [
    {
      path: 'products',
      title: "Products",
      component: CatalogListing,
    },
  ];