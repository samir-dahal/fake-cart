import { Routes } from '@angular/router';
import { catalogRoutes } from './features/catalog/routes';
import { cartRoutes } from './features/cart/routes';
export const routes: Routes = [
    ...catalogRoutes,
    ...cartRoutes,
];
