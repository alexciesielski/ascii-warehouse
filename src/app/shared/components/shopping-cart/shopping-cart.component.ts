import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormatCurrency } from '../../pipes/format-currency.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-shopping-cart',
  templateUrl: 'shopping-cart.component.html',
  styleUrls: ['shopping-cart.component.css'],
  pipes: [FormatCurrency]
})
export class ShoppingCartComponent {
  private shoppingCart: Product[] = [];
  private previousShoppingCartCount: number = 0;
  private total: number = 0;
  private isHidden = true;

  constructor() { }

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

  public show() {
    this.isHidden = false;
  }

  public hide() {
    this.isHidden = true;
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
