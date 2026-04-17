import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceTs } from '../services/auth-service/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceTs);
  const router = inject(Router);

  return authService.checkSession().pipe(
    map(response => {
      const user = response?.user;

      if (!user) {
        router.navigate(['/login']);
        return false;
      }

      if (user.tipo === 'administrador') {
        return true;
      }

      if (user.tipo === 'cliente') {
        router.navigate(['/clientes']);
        return false;
      }

      router.navigate(['/login']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
