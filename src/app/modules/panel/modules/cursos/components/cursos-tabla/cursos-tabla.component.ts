import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Curso } from '../../models';
import { Observable } from 'rxjs';
import { User } from '../../../../../../core/models';
import { AutenticacionService } from '../../../../../../core/services/autenticacion.service';
import { selectCursos } from '../../store/cursos.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cursos-tabla',
  standalone: false,
  templateUrl: './cursos-tabla.component.html',
})
export class CursosTablaComponent {
  displayedColumns: string[] = ['id', 'desc', 'acciones'];

  // INICIALIZAMOS DATA DEL COMPONENTE PADRE
  @Input()
  dataSource: Curso[] = [];

  // BORRAR UN CURSO
  @Output()
  borrarCurso = new EventEmitter<number>();

  // EDITAR UN CURSO
  @Output()
  editarCurso = new EventEmitter<Curso>();

  cursos$: Observable<Curso[] | []>;

  // PARA USAR OBSERVABLE DE DATOS DE USUARIO
  autUsuario$: Observable<User | null>;
  constructor(private autServ: AutenticacionService, private store: Store) {
    this.autUsuario$ = this.autServ.autenticacionUser$;
    this.cursos$ = this.store.select(selectCursos);
  }
}
