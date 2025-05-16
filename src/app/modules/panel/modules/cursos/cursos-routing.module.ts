import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';


// lazy desde /panel/cursos


const routes: Routes = [
    {
      path: '', component: CursosComponent, 
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
