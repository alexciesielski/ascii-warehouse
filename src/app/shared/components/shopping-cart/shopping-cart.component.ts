import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../product.model';

@Component({
  moduleId: module.id,
  selector: 'app-shopping-cart',
  templateUrl: 'shopping-cart.component.html',
  styleUrls: ['shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input('shoppingCart') shoppingCart: Product[] = [];

  constructor() { }

  ngOnInit() {
  }

}
