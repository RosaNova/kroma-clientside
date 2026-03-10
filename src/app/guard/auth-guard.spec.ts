import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { authGuard } from './auth-guard';
declare const jasmine: any;

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }],
    });
  });

  it('should block access and redirect when no token', () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('role');
    }
    const result = executeGuard({ data: {} } as any, { url: '/protected' } as any) as boolean;
    expect(result).toBeFalsy();
    const router = TestBed.inject(Router) as any;
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow access when token present', () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('token', 'test-token');
      window.localStorage.setItem('role', 'MERCHANT');
    }
    const result = executeGuard({ data: {} } as any, { url: '/protected' } as any) as boolean;
    expect(result).toBeTruthy();
  });
});
