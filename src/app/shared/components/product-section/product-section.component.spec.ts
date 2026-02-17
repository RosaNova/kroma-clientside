import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSection } from './product-section';

describe('ProductSection', () => {
  let component: ProductSection;
  let fixture: ComponentFixture<ProductSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
