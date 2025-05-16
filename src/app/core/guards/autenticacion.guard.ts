import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

export const autenticacionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const autServ = inject(AutenticacionService);
  const autUsuario = autServ.vericarToken(localStorage.getItem('token') || '');

  if (autUsuario) { 
    return true; 
  } 
  else {
    router.navigate(['autenticacion', 'login']);
    return false;
  }

};
