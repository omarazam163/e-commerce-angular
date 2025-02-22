import { CanActivateFn, Router } from '@angular/router';
import { inject,PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth/register.service';
import { isPlatformBrowser } from '@angular/common';


export const authGuard: CanActivateFn = (route, state) => {
  const _platformId = inject(PLATFORM_ID);
  const _register = inject(AuthService);
  const router = inject(Router);
  if(isPlatformBrowser(_platformId))
  {
    if(localStorage.getItem('token'))
    {
      return true;
    }
    else
    {
      router.navigate(['/signin']);
      return false;
    }
  }
  else
  {
    return false;
  }
};