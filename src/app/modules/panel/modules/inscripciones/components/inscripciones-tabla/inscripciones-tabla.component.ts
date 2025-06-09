import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inscripcion } from '../../models';
import { Observable } from 'rxjs';
import { User } from '../../../../../../core/models';
import { AutenticacionService } from '../../../../../../core/services/autenticacion.service';

@Component({
  selector: 'app-inscripciones-tabla',
  standalone: false,
  templateUrl: './inscripciones-tabla.component.html',
 
})
export class InscripcionesTablaComponent {

 displayedColumns: string[] = ['id', 'doc', 'student', 'courseId','course', 'fecha', 'usuarioId', 'acciones'];
 
    // INICIALIZAMOS DATA DEL COMPONENTE PADRE
  @Input ()
  dataSource: Inscripcion [] = [];

 // BORRAR UNA INSC
 @Output ()
borrarInscripcion = new EventEmitter<number>();

 // EDITAR UNA INSC
 @Output ()
editarInscripcion = new EventEmitter<Inscripcion>();

  // PARA USAR OBSERVABLE DE DATOS DE USUARIO
  autUsuario$: Observable<User | null>;
  constructor(private autServ: AutenticacionService) {
    this.autUsuario$ = this.autServ.autenticacionUser$;
  }
}



