import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Curso } from '../../models';

@Component({
  selector: 'app-cursos-tabla',
  standalone: false, 
  templateUrl: './cursos-tabla.component.html',
})

export class CursosTablaComponent {
displayedColumns: string[] = ['id', 'desc', 'acciones'];
  
  
  // INICIALIZAMOS DATA DEL COMPONENTE PADRE
  @Input ()
  dataSource: Curso [] = [];

 // BORRAR UN CURSO
 @Output ()
borrarCurso = new EventEmitter<number>();

 // EDITAR UN CURSO
 @Output ()
editarCurso = new EventEmitter<Curso>();
}


