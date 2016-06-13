import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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
export class XteamAppComponent implements OnInit {
  @ViewChild('productList') productList: ProductListComponent;
  @ViewChild('shoppingCart') shoppingCart: ShoppingCartComponent;

  title = 'Discount Ascii Warehouse';
  error: any = null;

  isLoading = false;
  isEndOfCatalogue = false;

  preloadedProducts: Product[] = [];

  sortOptions: string[] = [];
  selectedSortOption: string;

  constructor(
    private _productsService: ProductService
  ) { }

  ngOnInit() {
    this.sortOptions = ProductService.SORT_OPTIONS;
    this.selectedSortOption = this.sortOptions[0];

    this.loadProducts(true, 20);
  }

  reset() {
    this.isLoading = false;
    this.isEndOfCatalogue = false;
    this.preloadedProducts = [];
    this.error = null;
    this.productList.resetItems();
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
    this.reset();
    this.loadProducts(true, 20);
  }

  /**
   * Preloads the products. Called when ProductListComponent emits 'scrolledNearBottom' event.
   * shouldShowProducts: if false, products will be displayed after user has scrolled to bottom of page
   * productsToFetch: optional number of products to fetch from API
   */
  loadProducts(shouldShowProducts: boolean, productsToFetch?: number) {
    if (!this.isEndOfCatalogue) {

      let sort = this.selectedSortOption;
      let limit = productsToFetch || 50;
      let skip = 0;

      if (this.productList) { // productList not yet initialized at OnInit
        skip = this.productList.getProductsCount(); 
      }

      this.isLoading = true;
      this._productsService.getProducts(sort, limit, skip).subscribe(

        products => {

          let productsFetchedCount = products.length;

          if (productsFetchedCount > 0) {
            this.productList.addProducts(products, shouldShowProducts);
          }

          if (productsFetchedCount < limit) {
            this.isEndOfCatalogue = true;
            console.log('end of catalogue');
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
