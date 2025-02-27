import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {
  let _toast = inject(ToastrService);
  return next(req).pipe(
    catchError((error:any)=>{
      return throwError(()=>{
        console.log(req.url);
              _toast.error(error.error.message);
              return error
      });
    })
  );
};
