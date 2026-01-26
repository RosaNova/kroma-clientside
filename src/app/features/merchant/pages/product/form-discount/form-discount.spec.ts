import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDiscount } from './form-discount';

describe('FormDiscount', () => {
  let component: FormDiscount;
  let fixture: ComponentFixture<FormDiscount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDiscount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDiscount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
