import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersDetail } from './admin-users-detail';

describe('AdminUsersDetail', () => {
  let component: AdminUsersDetail;
  let fixture: ComponentFixture<AdminUsersDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsersDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsersDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
