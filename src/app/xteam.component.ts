import { Component } from '@angular/core';
import { Product, ProductService } from './shared/index';
import { ProductListComponent } from './product-list/product-list.component';


@Component({
  moduleId: module.id,
  selector: 'xteam-app',
  templateUrl: 'xteam.component.html',
  styleUrls: ['xteam.component.css'],
  providers: [ProductService],
  directives: [ProductListComponent]
})
export class XteamAppComponent {
  title = 'Discount Ascii Warehouse';
  randomAdURL = this.getRandomAd();

  constructor() { }

  getRandomAd() {
    return 'http://localhost:8000/ad/?r=' + Math.floor(Math.random() * 1000);
  }
}
