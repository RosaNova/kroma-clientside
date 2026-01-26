import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDiscountCurpon } from './product-discount-curpon';

describe('ProductDiscountCurpon', () => {
  let component: ProductDiscountCurpon;
  let fixture: ComponentFixture<ProductDiscountCurpon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDiscountCurpon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDiscountCurpon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
