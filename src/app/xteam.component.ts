import { Component, OnInit, ViewChild } from '@angular/core';
import { Ad, Product, AdComponent, ProductListComponent, ShoppingCartComponent, ProductService } from './shared/index';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'xteam-app',
  templateUrl: 'xteam.component.html',
  styleUrls: ['xteam.component.css'],
  providers: [ProductService],
  directives: [ProductListComponent, AdComponent, ShoppingCartComponent]
})
export class XteamAppComponent {
  @ViewChild('shoppingCart') shoppingCart: ShoppingCartComponent;

  title = 'Discount Ascii Warehouse';
  error: any;

  isLoading = false;
  isEndOfCatalogue = false;

  // list of products and ads (at every 20th position)
  items: any[] = [];
  productsCount: number = 0;

  sortOptions: string[] = [];
  selectedSortOption: string;

  constructor(
    private _productsService: ProductService
  ) { }

  ngOnInit() {
    // Initialize form
    this.sortOptions = ProductService.SORT_OPTIONS;
    this.selectedSortOption = this.sortOptions[0];

    this.getProducts(20);
  }

  resetItems() {
    this.items = [];
    this.productsCount = 0;
  }

  toggleShoppingCartVisibility() {
    this.shoppingCart.toggleVisibility();
  }

  onAddedToCart(product) {
    console.log('Added to cart', product.face);
    this.shoppingCart.addProduct(product);
  }

  applySort() {
    console.log(this.selectedSortOption);
    this.resetItems();
    this.getProducts(20);
  }

  insertAdsIntoItems() {
    let multiplesOfTwenty = Math.floor(this.productsCount / 20);

    for (let i = 0; i < multiplesOfTwenty; i++) {
      let index = (i + 1) * 20;
      if (!this.isAd(this.items[index])) {
        this.items.splice(index, 0, this.createAd());
        console.log('inserted ad at ' + index);
      }
    }
  }

  addProductsToItems(products: Product[]) {
    this.productsCount += products.length;
    this.items = Array.prototype.concat(this.items, products);
  }

  createAd(): Ad {
    // should be moved to own service in production app
    return new Ad();
  }

  loadMoreProducts() {
    this.getProducts(50);
  }

  isAd(item: Object) {
    // fine for demo purposes, should be done differently in larger app  
    return (item && item.hasOwnProperty('url'));
  }

  getProducts(productsToFetch: number) {
    if (!this.isEndOfCatalogue) {
      let sort = this.selectedSortOption;
      let limit = productsToFetch || 50;
      let skip = this.productsCount;

      this.isLoading = true;

      this._productsService.getProducts(sort, limit, skip).subscribe(
        products => {
          let productsFetchedCount = products.length;

          if (productsFetchedCount > 0) {
            this.addProductsToItems(products);
            this.insertAdsIntoItems();
            console.log('current products count:', this.productsCount);
          }

          if (productsFetchedCount < limit) {
            console.log('end of catalogue');
            this.isEndOfCatalogue = true;
          }

          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.error = 'Error connecting to server.';
        });
    }
  }
}
