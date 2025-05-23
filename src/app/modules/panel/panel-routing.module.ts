import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
