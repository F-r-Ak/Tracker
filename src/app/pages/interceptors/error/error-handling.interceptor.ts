import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error && error.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        router.navigateByUrl('/');
      }
      return throwError(() => error);
    })
  );
};
