import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../shared/index';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
})
export class ProductListComponent implements OnInit {

  loading = true;
  products: Product[];
  sortOptions: string[] = [];
  selectedSortOption: string;

  constructor(
    private _productsService: ProductService
  ) { }

  ngOnInit() {
    // Initialize form
    this.sortOptions = ProductService.SORT_OPTIONS;
    this.selectedSortOption = this.sortOptions[0];

    // Retrieve list of products
    this.getProducts(this.selectedSortOption);
  }

  getProducts(sort?: string, limit?: number, skip?: number) {
    this.products = [];
    this.loading = true;

    this._productsService.getProducts(sort, limit, skip).subscribe(products => {
      this.products = products;
      this.loading = false;
    });
  }

  onChangeSort(sortOption) {
    console.log(sortOption);
  }

  applySort() {
    this.getProducts(this.selectedSortOption);
  }

  //TODO: formatting
  formatTimestamp(timestamp) {
    // "Tue May 31 2016 15:07:06 GMT+0200 (Central European Daylight Time)"
    let formatted = moment(timestamp).fromNow();
    return formatted;
  }

}
