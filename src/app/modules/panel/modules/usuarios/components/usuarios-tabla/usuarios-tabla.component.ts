import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../models';
import { Observable } from 'rxjs';
import { User } from '../../../../../../core/models';
import { AutenticacionService } from '../../../../../../core/services/autenticacion.service';

@Component({
  selector: 'app-usuarios-tabla',
  standalone: false,
  templateUrl: './usuarios-tabla.component.html'

})
export class UsuariosTablaComponent {

  displayedColumns: string[] = ['nombre', 'email', 'password', 'role', 'acciones'];


  // INICIALIZAMOS DATA DEL COMPONENTE PADRE
  @Input()
  dataSource: Usuario[] = [];

  // BORRAR UN USUARIO
  @Output()
  borrarUsuario = new EventEmitter<number>();

  // EDITAR UN USUARIO
  @Output()
  editarUsuario = new EventEmitter<Usuario>();

  // PARA USAR OBSERVABLE DE DATOS DE USUARIO

  autUsuario$: Observable<User | null>;
  constructor(private autServ: AutenticacionService) {
    this.autUsuario$ = this.autServ.autenticacionUser$;
  }
}