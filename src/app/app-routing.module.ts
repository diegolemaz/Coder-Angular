import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './modules/panel/panel.component';
import { AlumnosComponent } from './modules/panel/modules/alumnos/alumnos.component';

import { CursosComponent } from './modules/panel/modules/cursos/cursos.component';

const routes: Routes = [

  {
    path: 'panel', component: PanelComponent, children: [
      {
        path: 'alumnos',
        component: AlumnosComponent

      },

          {
        path: 'cursos',
        component: CursosComponent

      },
    ]
  },
  { path: '**', redirectTo: '/panel'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//import { InscripcionesComponent } from './modules/panel/modules/inscripciones/inscripciones.component';

      // {
      //   path: 'inscripciones',
      //   component: InscripcionesComponent

      // },