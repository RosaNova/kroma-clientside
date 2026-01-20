import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formcreateproduct } from './formcreateproduct';

describe('Formcreateproduct', () => {
  let component: Formcreateproduct;
  let fixture: ComponentFixture<Formcreateproduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formcreateproduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formcreateproduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
