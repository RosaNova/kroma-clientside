import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllProductCategory } from './see-all-product-category';

describe('SeeAllProductCategory', () => {
  let component: SeeAllProductCategory;
  let fixture: ComponentFixture<SeeAllProductCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeAllProductCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeAllProductCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
