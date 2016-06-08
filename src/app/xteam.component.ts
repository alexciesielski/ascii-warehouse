import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { Product, AdComponent, ProductListComponent, ShoppingCartComponent, ProductService, LoadingComponent } from './shared/index';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'xteam-app',
  templateUrl: 'xteam.component.html',
  styleUrls: ['xteam.component.css'],
  providers: [ProductService],
  directives: [ProductListComponent, AdComponent, ShoppingCartComponent, LoadingComponent],
  changeDetection: ChangeDetectionStrategy.Default
})
export class XteamAppComponent {
  title = 'Discount Ascii Warehouse';
  randomAdURL = this.getRandomAd();
  isLoading = false;

  products: Product[] = [];
  productsCount: number = 0;

  shoppingCart: Product[] = [];

  sortOptions: string[] = [];
  selectedSortOption: string;

  constructor(
    private _productsService: ProductService,
    private _zone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Initialize form
    this.sortOptions = ProductService.SORT_OPTIONS;
    this.selectedSortOption = this.sortOptions[0];

    this.getProducts();
  }

  onAddedToCart(product) {
    console.log('Added to cart', product.face);
    this.shoppingCart.push(product);
  }

  applySort() {
    console.log(this.selectedSortOption);
    this.getProducts();
  }

  getProducts() {
    let sort = this.selectedSortOption;
    let limit = 20;
    let skip = this.products.length;

    this.isLoading = true;

    this._productsService.getProducts(sort, limit, skip).subscribe(products => {
      // A new reference has to be set to trigger Angular 2's ChangeDetection
      this.products = Array.prototype.concat(this.products, products);
      this.isLoading = false;
    });
  }

  getRandomAd() {
    return 'http://localhost:8000/ad/?r=' + Math.floor(Math.random() * 1000);
  }

  loadMoreProducts() {
    this.getProducts();
  }
}
