import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { AlumnosTablaComponent } from './components/alumnos-tabla/alumnos-tabla.component';

// IMPORTAMOS TABLAS
import {MatTableModule} from '@angular/material/table';

// IMPORTAMOS FORM FIELD E IMPUT
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

// IMPORTAMOS BOTONES
import {MatButtonModule} from '@angular/material/button';

//IMPORTAMOS FORMULARIO
import { ReactiveFormsModule } from '@angular/forms';

//IMPORTAMOS ICONOS
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AlumnosComponent,
    AlumnosTablaComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule
  ],
  exports: [AlumnosComponent]
})
export class AlumnosModule { }
