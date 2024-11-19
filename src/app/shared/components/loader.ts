import { Component } from '@angular/core';
@Component({
  standalone: true,
  selector: 'loader',
  styleUrl: 'loader.css',
  template: `
    <div class="loader-overlay">
      <div class="loader"></div>
    </div>
  `,
})
export class Loader {}
