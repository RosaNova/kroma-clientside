import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDiscountCouponComponent } from './product-discount-coupon.component';

describe('ProductDiscountCouponComponent', () => {
  let component: ProductDiscountCouponComponent;
  let fixture: ComponentFixture<ProductDiscountCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDiscountCouponComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductDiscountCouponComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
