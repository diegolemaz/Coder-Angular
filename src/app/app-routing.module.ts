import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './modules/panel/panel.component';
import { AutenticacionComponent } from './modules/autenticacion/autenticacion.component';


const routes: Routes = [
 {
    path: 'autenticacion', component: AutenticacionComponent,
    loadChildren: () => import('./modules/autenticacion/autenticacion.module').then ((m) => m.AutenticacionModule)
  },
 
  {
    path: 'panel', component: PanelComponent,
    loadChildren: () => import('./modules/panel/panel.module').then ((m) => m.PanelModule)
  },

  { path: '**', redirectTo: '/panel'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


