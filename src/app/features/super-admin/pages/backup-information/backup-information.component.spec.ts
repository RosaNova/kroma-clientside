import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupInformation } from './backup-information';

describe('BackupInformation', () => {
  let component: BackupInformation;
  let fixture: ComponentFixture<BackupInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackupInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackupInformation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
