import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product, ProductService, ProductComponent } from '../../index';

import { ScrollSpy } from '../../scroll-spy.directive'; // import separately to avoid error "Unexpected directive value 'undefined'" 
import { FormatTimestamp } from '../../format-timestamp.pipe'; // same here

@Component({
  moduleId: module.id,
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css'],
  directives: [ProductComponent, ScrollSpy],
  pipes: [FormatTimestamp]
})
export class ProductListComponent implements OnInit {
  @Input('products') products: Product[];

  @Output('addedToCart') addedToCart: EventEmitter<Product> = new EventEmitter<Product>();
  @Output('preload') preload: EventEmitter<any> = new EventEmitter<any>();

  randomAdUrl: string;
  scrolledToBottom: boolean = false;

  constructor() { }

  ngOnInit() {
    //this.randomAdUrl = this.getRandomAd();
  }

  addToCart(product) {
    console.log('Added to cart: ' + product.face);
    this.addedToCart.emit(product);
  }

  onScroll(percentageScrolled) {
    console.log('Scrollposition: ' + percentageScrolled + '%');
    if (percentageScrolled < 75) {
      this.scrolledToBottom = false;
    }

    if (this.scrolledToBottom === false && percentageScrolled > 75) {
      this.scrolledToBottom = true;
      this.preload.emit(true);
    }
  }

  getRandomAd() {
    return 'http://localhost:8000/ad/?r=' + Math.floor(Math.random() * 1000);
  }
}
