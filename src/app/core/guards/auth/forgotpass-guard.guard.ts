import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/register.service';
import { Router } from '@angular/router';
export const forgotpassGuardGuard: CanActivateFn = (route, state) => {
  let _auth = inject(AuthService);
  let _router = inject(Router);
  if(_auth.emailToResetPassword !== ''){return true}
  else{
    _router.navigate(['/reset-password']);
    return false;}
};
