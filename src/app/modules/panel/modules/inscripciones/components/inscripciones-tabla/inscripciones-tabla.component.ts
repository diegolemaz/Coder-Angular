import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inscripcion } from '../../models';

@Component({
  selector: 'app-inscripciones-tabla',
  standalone: false,
  templateUrl: './inscripciones-tabla.component.html',
 
})
export class InscripcionesTablaComponent {

  displayedColumns: string[] = ['doc', 'cursoId', 'acciones' ];
 
    // INICIALIZAMOS DATA DEL COMPONENTE PADRE
  @Input ()
  dataSource: Inscripcion [] = [];

 // BORRAR UNA INSC
 @Output ()
borrarInscripcion = new EventEmitter<number>();

 // EDITAR UNA INSC
 @Output ()
editarInscripcion = new EventEmitter<Inscripcion>();
}



