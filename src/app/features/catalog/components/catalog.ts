import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
@Component({
  standalone: true,
  selector: 'catalog',
  template: `
  <div>
    <img priority [ngSrc]="image" [alt]="title" width="200" height="200" />
    <p>{{title}}</p>
    <small>{{category}}</small>
    <p>{{price}}</p>
    <button>Buy Now</button>
</div>
  `,
  imports: [NgOptimizedImage],
})
export class Catalog {
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() category: string = '';
  @Input() price: number = 0;
}
