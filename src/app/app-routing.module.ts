import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './modules/panel/panel.component';


const routes: Routes = [

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


