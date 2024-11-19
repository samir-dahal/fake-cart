import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductResponse } from '../contracts/responses/product.response';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  public getAll(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      'https://fakestoreapi.com/products'
    );
  }
}
