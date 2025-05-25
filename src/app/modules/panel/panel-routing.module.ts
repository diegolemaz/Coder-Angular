import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

// lazy desde /panel

const routes: Routes = [
  {
  path: 'alumnos', loadChildren: () => import('./modules/alumnos/alumnos.module').then((m) => m.AlumnosModule),
  },

    {
  path: 'cursos', loadChildren: () => import('./modules/cursos/cursos.module').then((m) => m.CursosModule),
  },
    {
  path: 'inscripciones', loadChildren: () => import('./modules/inscripciones/inscripciones.module').then((m) => m.InscripcionesModule),
  },

  {path: 'usuarios', canActivate: [adminGuard],  loadChildren: () => import('./modules/usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
