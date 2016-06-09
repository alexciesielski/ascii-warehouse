import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product, ProductService, ProductComponent, AdComponent } from '../../index';

import { ScrollSpy } from '../../scroll-spy.directive'; // import separately to avoid error "Unexpected directive value 'undefined'" 
import { FormatTimestamp } from '../../format-timestamp.pipe'; // same here
import { FormatCurrency } from '../../format-currency.pipe'; // same here

@Component({
  moduleId: module.id,
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css'],
  directives: [AdComponent, ProductComponent, ScrollSpy],
  pipes: [FormatTimestamp, FormatCurrency]
})
export class ProductListComponent {
  @Input('items') items: any[];

  @Output('addedToCart') addedToCart: EventEmitter<Product> = new EventEmitter<Product>();
  @Output('preload') preload: EventEmitter<any> = new EventEmitter<any>();

  scrolledToBottom: boolean = false;
  preloadAtPercentage: number = 90;

  constructor() { }

  addToCart(product) {
    //console.log('Added to cart: ' + product.face);
    this.addedToCart.emit(product);
  }

  onScroll(percentageScrolled) {
    //console.log('Scrollposition: ' + percentageScrolled + '%');

    if (percentageScrolled < this.preloadAtPercentage) {
      this.scrolledToBottom = false;
    }

    if (this.scrolledToBottom === false && percentageScrolled > this.preloadAtPercentage) {
      this.scrolledToBottom = true;
      this.preload.emit(true);
    }
  }

  isProduct(item: any) {
    return !!item.face;
  }

  isAd(item: any) {
    return !!item.url;
  }
}
