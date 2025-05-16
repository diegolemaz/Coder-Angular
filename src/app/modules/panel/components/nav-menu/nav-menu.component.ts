import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {

  //cerrar sesion borra token y redirige a login 
  constructor (private router: Router) {}
  logout () {
    localStorage.removeItem('token');
    this.router.navigate(['autenticacion', 'login'])
  }

}
