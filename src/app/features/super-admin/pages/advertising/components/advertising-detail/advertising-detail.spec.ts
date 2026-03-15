import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingDetail } from './advertising-detail';

describe('AdvertisingDetail', () => {
  let component: AdvertisingDetail;
  let fixture: ComponentFixture<AdvertisingDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisingDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisingDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
