import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrHeader } from './kr-header';

describe('KrHeader', () => {
  let component: KrHeader;
  let fixture: ComponentFixture<KrHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KrHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
