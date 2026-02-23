import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCategories } from './store-categories';

describe('StoreCategories', () => {
  let component: StoreCategories;
  let fixture: ComponentFixture<StoreCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
