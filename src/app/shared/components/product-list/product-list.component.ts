import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ad, Product, ProductService, ProductComponent, AdComponent } from '../../index';

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
  @Output('addedToCart') addedToCart: EventEmitter<Product> = new EventEmitter<Product>();
  @Output('scrolledNearBottom') scrolledNearBottom: EventEmitter<any> = new EventEmitter<any>();

  // list of products and ads (at every 20th position)
  private items: any[] = [];

  // number of products in items array
  private productsCount: number = 0;

  // used to optimize 'insertAds'
  private previousProductsCount: number = 0;

  // list of products that are about to be displayed, when user scrolls to bottom
  private preloadedProducts: Product[] = [];

  private isScrolledNearBottom: boolean = false;
  private isScrolledToBottom: boolean = false;

  private scrolledNearBottomPercentage: number = 90;
  private scrolledToBottomPercentage: number = 99;

  constructor() { }

  public addProducts(products: Product[], shouldShowProducts?: boolean) {
    //console.log('add products', products.length);
    this.preloadedProducts = Array.prototype.concat(this.preloadedProducts, products);
    //this.productsCount += products.length;

    if (shouldShowProducts || this.isScrolledToBottom) {
      this.showProducts();
    }
  }

  public getProductsCount(): number {
    return this.productsCount;
  }

  public resetItems() {
    this.items = [];
    this.productsCount = 0;
  }

  // -- private helper methods -- //

  private showProducts() {
    if (this.preloadedProducts.length > 0) {
      this.previousProductsCount = this.productsCount;
      this.productsCount += this.preloadedProducts.length;;
      this.items = Array.prototype.concat(this.items, this.preloadedProducts);
      this.preloadedProducts = [];
      console.log('displaying ' + this.productsCount + ' products');
    }
    this.insertAdsIntoItems();
  }

  private insertAdsIntoItems() {
    let startInsertingAdsIndex = Math.floor(this.previousProductsCount / 20);
    let stopInsertingAdsIndex = Math.floor(this.productsCount / 20);

    for (let i = startInsertingAdsIndex; i < stopInsertingAdsIndex; i++) {

      let index = (i + 1) * 20;

      if (!this.isAd(this.items[index])) {
        // Insert Ad at position: index
        this.items.splice(index, 0, new Ad());
        console.log('inserted ad at ' + index);
      }

    }
  }

  private addToCart(product) {
    //console.log('Added to cart: ' + product.face);
    this.addedToCart.emit(product);
  }

  private onScroll(percentageScrolled) {
    //console.log('Scrollposition: ' + percentageScrolled + '%');

    if (percentageScrolled < this.scrolledNearBottomPercentage) {
      this.isScrolledNearBottom = false;
    }

    if(percentageScrolled < this.scrolledToBottomPercentage) {
      this.isScrolledToBottom = false;
    }

    // emit event only once (if not yet scrolled near bottom)
    if (this.isScrolledNearBottom === false && percentageScrolled > this.scrolledNearBottomPercentage) {
      this.isScrolledNearBottom = true;

      // only preload products if none are available already
      if (this.preloadedProducts.length === 0) {
        this.scrolledNearBottom.emit(true);
      }
    }

    if (this.isScrolledNearBottom && percentageScrolled >= this.scrolledToBottomPercentage) {
      //this.scrolledToBottom.emit(true);
      // Scrolled to bottom
      this.isScrolledToBottom = true;
      this.showProducts();
    }
  }

  private isProduct(item: any) {
    return (item && item.hasOwnProperty('face'));
  }

  private isAd(item: Object) {
    // fine for demo purposes, should be done differently in larger app  
    return (item && item.hasOwnProperty('url'));
  }

}
