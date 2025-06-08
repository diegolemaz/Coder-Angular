import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { InscripcionesTablaComponent } from './components/inscripciones-tabla/inscripciones-tabla.component';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [InscripcionesComponent, InscripcionesTablaComponent],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    SharedModule,
  ],
  exports: [InscripcionesComponent],
})
export class InscripcionesModule {}
