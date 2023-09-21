import { CanActivateFn, Router } from '@angular/router';
import AuthenticationService from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  var auth: boolean = AuthenticationService.isAuthenticated();
  if (!auth) {
    router.navigate(['login']);
  }
  return auth;
};
