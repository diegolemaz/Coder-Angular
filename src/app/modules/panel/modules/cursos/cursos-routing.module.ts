import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { CursosDetalleComponent } from './pages/cursos-detalle/cursos-detalle.component';


// lazy desde /panel/cursos


const routes: Routes = [
    {
      path: '', component: CursosComponent, 
  
  },
  {
    path: ':id', component: CursosDetalleComponent, 

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
