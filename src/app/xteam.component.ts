import { Component, OnInit, ViewChild } from '@angular/core';
import { Ad, Product, AdComponent, ProductListComponent, ShoppingCartComponent, ProductService, LoadingComponent } from './shared/index';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'xteam-app',
  templateUrl: 'xteam.component.html',
  styleUrls: ['xteam.component.css'],
  providers: [ProductService],
  directives: [ProductListComponent, AdComponent, ShoppingCartComponent, LoadingComponent]
})
export class XteamAppComponent {
  @ViewChild('shoppingCart') shoppingCart: ShoppingCartComponent;

  title = 'Discount Ascii Warehouse';
  randomAd = this.createAd();
  isLoading = false;
  isEndOfCatalogue = false;

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

  toggleShoppingCartVisibility() {
    this.shoppingCart.toggleVisibility();
  }

  onAddedToCart(product) {
    console.log('Added to cart', product.face);
    this.shoppingCart.addProduct(product);
  }

  applySort() {
    console.log(this.selectedSortOption);
    this.getProducts(20);
  }

  getProducts(productsToFetch: number) {
    let sort = this.selectedSortOption;
    let limit = productsToFetch || 50;
    let skip = this.productsCount;

    this.isLoading = true;

    this._productsService.getProducts(sort, limit, skip).subscribe(products => {
      let productsFetchedCount = products.length;

      if (productsFetchedCount > 0) {
        this.addProductsToItems(products);
        this.insertAdsIntoItems();
        console.log('current products count:', this.productsCount);
      } else {
        console.log('end of catalogue');
        this.isEndOfCatalogue = true;
      }
      this.isLoading = false;
    });
  }

  insertAdsIntoItems() {
    let multiplesOfTwenty = Math.floor(this.productsCount / 20);
    console.log('products count', this.productsCount);
    console.log('multiplesOfTwenty', multiplesOfTwenty);
    for (let i = 0; i < multiplesOfTwenty; i++) {
      // Insert Ad at every 20th position if not already there
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

  createAd() {
    return { url: 'http://localhost:8000/ad/?r=' + Math.floor(Math.random() * 1000) };
  }

  loadMoreProducts() {
    this.getProducts(50);
  }

  isAd(item: Object) {
    return (item && item.hasOwnProperty('url'));
  }
}
