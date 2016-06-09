import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Product } from '../../product.model';
import { FormatCurrency } from '../../format-currency.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-shopping-cart',
  templateUrl: 'shopping-cart.component.html',
  styleUrls: ['shopping-cart.component.css'],
  pipes: [FormatCurrency]
})
export class ShoppingCartComponent implements OnInit, DoCheck {
  @Input('products') shoppingCart: Product[] = [];
  previousShoppingCartCount: number = 0;
  total: number = 0;
  isHidden = true;

  constructor() { }

  ngOnInit() { }

  ngDoCheck() {
    if (this.shoppingCart.length > this.previousShoppingCartCount) {
      this.previousShoppingCartCount = this.shoppingCart.length;
      this.calculateTotal();
    }
  }

  public addProduct(product) {
    this.shoppingCart.push(product);
    this.calculateTotal();
  }

  public getProductCount() {
    return this.shoppingCart.length;
  }

  public removeProduct(product) {
    console.log('remove product ' + product.face);
    let index = this.shoppingCart.indexOf(product);

    if (index > -1) {
      this.shoppingCart.splice(index, 1);
      this.calculateTotal();
    }
  }

  public toggleVisibility() {
    this.isHidden = !this.isHidden;
  }

  private calculateTotal() {
    let total = 0;
    for (let i = 0; i < this.shoppingCart.length; i++) {
      total += this.shoppingCart[i].price;
    }
    this.total = total;
  }

}
