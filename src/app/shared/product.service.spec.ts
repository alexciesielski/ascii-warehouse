import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ProductService } from './product.service';

describe('Ascii Service', () => {
  beforeEachProviders(() => [ProductService]);

  it('should ...',
      inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
