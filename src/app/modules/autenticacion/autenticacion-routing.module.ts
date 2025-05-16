import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionComponent } from './autenticacion.component';

// partimos de /autorizacion

const routes: Routes = [
  {
    path: '', component: AutenticacionComponent,
    children: [
      {
        path: 'login', loadChildren: () => import('./login/login.module').then ((m) => m.LoginModule)
      },
      {
        path: '**', redirectTo: 'login',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule { }
