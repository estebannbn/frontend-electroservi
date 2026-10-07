import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authReq = req.clone({
    withCredentials: true
  });

  return next(authReq).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && router.url.startsWith('/tecnicos')) {
        void router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
