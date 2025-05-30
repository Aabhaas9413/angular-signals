import { CommonModule } from '@angular/common';
import { Component, linkedSignal, signal } from '@angular/core';
import { PRODUCTS } from './products';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly products = signal(['Apple', 'Banana', 'Cherry']);

  //readonly selectedProduct = signal('Apple');

  /* 1. Create a simple linked signal that sets the selected product to the first
        product in the list., wheven the inventory changes */
  //readonly selectedProduct = linkedSignal(() => this.products()[0]);      

  /* 2. Change the `linkedSignal` so you use the second signature, supply an object 
        with source and computation properties */
  // readonly selectedProduct = linkedSignal({
  //   source: () => this.products(),
  //   computation: (products) => products[0]
  // });

  /* 3. In the computation, use the previous value, to check if the selected product
        is still in the list, if not, set the selected product to the first product in the list */
  readonly selectedProduct = linkedSignal<string[], string>({
    source: () => this.products(),
    computation: (products, prev) => {
      if (products.length === 0) {
        return '';
      }
      if (prev && products.includes(prev.value)) {
        return prev.value;
      }
      return products[0];
    }
  })

  addProduct() {
    this.products.update(prods => [...prods, PRODUCTS[prods.length]]);
  }

  removeProduct() {
    this.products.update(prods => prods.slice(0, -1));
  }

  nextProduct() {
    this.selectedProduct.update(selected => {
      const index = this.products().indexOf(selected);
      return this.products()[(index + 1) % this.products().length];
    });
  }

  prevProduct() {
    this.selectedProduct.update(selected => {
      const index = this.products().indexOf(selected);
      return this.products()[(index - 1 + this.products().length) % this.products().length];
    });
  }



}
