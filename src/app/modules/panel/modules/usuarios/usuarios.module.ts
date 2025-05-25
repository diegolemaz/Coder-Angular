import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosTablaComponent } from './components/usuarios-tabla/usuarios-tabla.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosTablaComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule, SharedModule
  ],
  exports: [UsuariosComponent]
})
export class UsuariosModule { }
