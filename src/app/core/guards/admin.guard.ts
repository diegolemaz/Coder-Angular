import { CanActivateFn } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const autService = inject (AutenticacionService);
  
  return autService.autenticacionUser$.pipe(
    map ((user) => {
      if (user && user.role === 'admin') {
        return true;
      } else {
        alert('No tienes permisos para acceder a esta página');
        return false;
      }
    })
  );
  
};
