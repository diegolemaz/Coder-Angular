import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { map } from 'rxjs';

export const autenticacionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const autServ = inject(AutenticacionService);

  return autServ.vericarToken().pipe(
    map((autenticacionUser) => {
      if (autenticacionUser) {
        return true;
      } else {
        router.navigate(['autenticacion', 'login']);
        return false;
      }
    })
  );
};
