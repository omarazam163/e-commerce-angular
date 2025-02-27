import { HttpInterceptorFn } from '@angular/common/http';
import { platform } from 'os';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const handleTokenInterceptor: HttpInterceptorFn = (req, next) => {
  let _PID = inject(PLATFORM_ID);
  if(isPlatformBrowser(_PID))
  {
    let token:string=localStorage.getItem('token')||"";
    let UpdatedREq = req.clone({
      setHeaders:{
        token: token
      }
    })
    return next(UpdatedREq);
  }
  return next(req);
};
