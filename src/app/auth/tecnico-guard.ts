import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceTs } from '../services/auth-service/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const tecnicoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceTs);
  const router = inject(Router);

  return authService.checkSession().pipe(
    map(response => {
      const user = response?.user;

      // Si no hay usuario, redirigir a login
      if (!user) {
        router.navigate(['/login']);
        return false;
      }

      // Permitir acceso si es técnico
      if (user.tipo === 'tecnico') {
        return true;
      }

      // Redirigir según el tipo de usuario si no es técnico
      if (user.tipo === 'cliente') {
        router.navigate(['/clientes']);
        return false;
      }

      if (user.tipo === 'administrador') {
        router.navigate(['/admin']);
        return false;
      }

      // Por seguridad, si el rol no es ninguno de los anteriores
      router.navigate(['/login']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
