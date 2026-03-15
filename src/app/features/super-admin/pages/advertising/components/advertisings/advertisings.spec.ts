import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Advertisings } from './advertisings';

describe('Advertisings', () => {
  let component: Advertisings;
  let fixture: ComponentFixture<Advertisings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Advertisings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Advertisings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
