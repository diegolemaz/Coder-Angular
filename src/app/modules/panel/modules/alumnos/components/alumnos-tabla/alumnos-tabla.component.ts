import { Component, EventEmitter, Input, Output } from '@angular/core';


import {MatTableModule} from '@angular/material/table';
import { Alumno } from '../../models/index';


@Component({
  selector: 'app-alumnos-tabla',
  standalone: false,
  templateUrl: './alumnos-tabla.component.html',
})
export class AlumnosTablaComponent {
  displayedColumns: string[] = ['doc', 'alumno' , 'curso', 'acciones' ];
  
  
  // INICIALIZAMOS DATA DEL COMPONENTE PADRE
  @Input ()
  dataSource: Alumno [] = [];

 // BORRAR UN ALUMNO
 @Output ()
borrarAlumno = new EventEmitter<number>();

 // EDITAR UN ALUMNO
 @Output ()
editarAlumno = new EventEmitter<Alumno>();
}
