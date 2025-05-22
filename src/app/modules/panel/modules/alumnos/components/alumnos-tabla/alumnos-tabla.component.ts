import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alumno } from '../../models/index';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../../../../../../core/services/autenticacion.service';
import { User } from '../../../../../../core/models';


@Component({
  selector: 'app-alumnos-tabla',
  standalone: false,
  templateUrl: './alumnos-tabla.component.html',
})
export class AlumnosTablaComponent {
  displayedColumns: string[] = ['doc', 'alumno', 'acciones'];


  // INICIALIZAMOS DATA DEL COMPONENTE PADRE
  @Input()
  dataSource: Alumno[] = [];

  // BORRAR UN ALUMNO
  @Output()
  borrarAlumno = new EventEmitter<number>();

  // EDITAR UN ALUMNO
  @Output()
  editarAlumno = new EventEmitter<Alumno>();

  // PARA USAR OBSERVABLE DE DATOS DE USUARIO

  autUsuario$: Observable<User | null>;
  constructor(private autServ: AutenticacionService) {
    this.autUsuario$ = this.autServ.autenticacionUser$;
  }
}