import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOutstock } from './product-outstock';

describe('ProductOutstock', () => {
  let component: ProductOutstock;
  let fixture: ComponentFixture<ProductOutstock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductOutstock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOutstock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
