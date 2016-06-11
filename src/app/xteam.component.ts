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

    this.preloadProducts(true, 20);
  }

  resetList() {
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
    this.resetList();
    this.preloadProducts(true, 20);
  }

  showPreloadedProducts() {
    console.log('show preloaded products');
    this.productList.addProducts(this.preloadedProducts);
    this.preloadedProducts = [];
  }


  // todo:
  // refactor displaying preloaded products into product list
  // this component only has to know when to preload products
  // not when to show them
  preloadProducts(shouldShowProducts: boolean, productsToFetch?: number) {
    console.log('preloadProducts(showProducts: ', + !!shouldShowProducts + ', limit: ' + productsToFetch);
    if (!this.isEndOfCatalogue) {

      if (this.preloadedProducts.length > 0) {
        console.log(this.preloadedProducts.length);
        this.showPreloadedProducts();
      } else {
        let sort = this.selectedSortOption;
        let limit = productsToFetch || 50;
        let skip = 0;
        if (this.productList) skip = this.productList.getProductsCount(); // productList at OnInit not yet initialized

        this.isLoading = true;
        this._productsService.getProducts(sort, limit, skip).subscribe(
          products => {
            let productsFetchedCount = products.length;

            if (productsFetchedCount > 0) {
              this.productList.addProducts(products, shouldShowProducts);
              console.log('current products count:', this.productList.getProductsCount());
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
}
