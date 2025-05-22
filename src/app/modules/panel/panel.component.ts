import { Component } from '@angular/core';
import { AutenticacionService } from '../../core/services/autenticacion.service';
import { User } from '../../core/models/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panel',
  standalone: false,
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {
  // SIDENAV
  showFiller = false;

  // OBTENER EL NOMBRE DE USUARIO
  autUsuario$: Observable<User | null>;
  constructor(private autServ: AutenticacionService) {
    this.autUsuario$ = this.autServ.autenticacionUser$;
  }
}
