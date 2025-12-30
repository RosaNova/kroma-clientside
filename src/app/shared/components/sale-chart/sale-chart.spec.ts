import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleChart } from './sale-chart';

describe('SaleChart', () => {
  let component: SaleChart;
  let fixture: ComponentFixture<SaleChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
