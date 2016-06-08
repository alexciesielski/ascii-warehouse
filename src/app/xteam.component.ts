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

  applySort() {
    console.log(this.selectedSortOption);
    //this.products = this._productsService.getProducts(this.selectedSortOption);
    this.products.push(new Product());
    this._changeDetectorRef.detectChanges();
  }

  getProducts() {
    let sort = this.selectedSortOption;
    let limit = 20;
    let skip = this.products.length;
    console.log('getProducts()');

    this.isLoading = true;

    this._productsService.getProducts(sort, limit, skip).subscribe(products => {
      console.log('this.products length', this.products.length);
      console.log('products length', products.length);
      let newProducts = Array.prototype.concat(this.products, products);
      console.log('products concat length', newProducts.length);

      this.products = newProducts;
      console.log('this.products length', this.products.length);
      //this._changeDetectorRef.detectChanges();



      this.isLoading = false;
    });
  }

  getRandomAd() {
    return 'http://localhost:8000/ad/?r=' + Math.floor(Math.random() * 1000);
  }

  loadMoreProducts() {
    console.log('load more products');
    this.getProducts();
  }
}
