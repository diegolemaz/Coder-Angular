import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos.component';
import { AlumnosDetalleComponent } from './pages/alumnos-detalle/alumnos-detalle.component';


// lazy desde /panel/alumnos

const routes: Routes = [
  {
    path: '', component: AlumnosComponent, 

},
{
    path: ':id', component: AlumnosDetalleComponent, 

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
