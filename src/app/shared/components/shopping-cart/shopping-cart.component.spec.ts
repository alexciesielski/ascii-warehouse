import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ShoppingCartComponent } from './shopping-cart.component';

describe('Component: ShoppingCart', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ShoppingCartComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ShoppingCartComponent],
      (component: ShoppingCartComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ShoppingCartComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ShoppingCartComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-shopping-cart></app-shopping-cart>
  `,
  directives: [ShoppingCartComponent]
})
class ShoppingCartComponentTestController {
}

