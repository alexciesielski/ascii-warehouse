import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css']
})
export class ProductComponent {
  
  @Input('size') size: number = 12;

  constructor() { }
}
