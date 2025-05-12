import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// IMPORTAMOS TABLAS
import { MatTableModule } from '@angular/material/table';

// IMPORTAMOS FORM FIELD E IMPUT
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// IMPORTAMOS BOTONES
import { MatButtonModule } from '@angular/material/button';

//IMPORTAMOS FORMULARIO
import { ReactiveFormsModule } from '@angular/forms';

//IMPORTAMOS ICONOS
import { MatIconModule } from '@angular/material/icon';

import { InscripcionesComponent } from './inscripciones.component';
import { InscripcionesTablaComponent } from './components/inscripciones-tabla/inscripciones-tabla.component';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';


@NgModule({
  declarations: [InscripcionesComponent, InscripcionesTablaComponent],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [InscripcionesComponent],
})
export class InscripcionesModule {}
