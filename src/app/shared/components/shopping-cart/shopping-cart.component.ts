import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../product.model';

@Component({
  moduleId: module.id,
  selector: 'app-shopping-cart',
  templateUrl: 'shopping-cart.component.html',
  styleUrls: ['shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input('products') shoppingCart: Product[] = [];

  constructor() { }

  ngOnInit() {
  }

  removeProduct(product) {
    console.log('remove product ' + product.face);
    let index = this.shoppingCart.indexOf(product);

    if (index > -1) this.shoppingCart.splice(index, 1);
  }

}
