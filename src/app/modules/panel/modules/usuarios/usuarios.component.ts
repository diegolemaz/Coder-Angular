import { Component } from '@angular/core';
import { Usuario } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../../core/models';
import { UsuarioService } from './usuario.service';
import { AutenticacionService } from '../../../../core/services/autenticacion.service';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  usuarioForm: FormGroup;
  usuariosData: Usuario[] = [];
  estoyEditId: number | null = null;
  estoyCargando = false;
// PARA DESHABILITAR FORM
   autUsuario$: Observable<User | null>;

  // VALIDACIONES Y SERVICIOS

  usuariosSubscription: Subscription | null = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private autServ: AutenticacionService) {
  
    this.loadUsuariosObservable(); // llamando obs
    
    // PARA DESHABILITAR FORM
    this.autUsuario$ = this.autServ.autenticacionUser$;

    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3),Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(admin|user)$/)]],
    });
  }

  // LOAD USUARIOS OBS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  loadUsuariosObservable() {
    this.estoyCargando = true;
    this.usuariosSubscription = this.usuarioService.getUsuarios$().subscribe({
      next: (datos) => {
        this.usuariosData = datos;
      },
      error: (error) => console.error(error),
      complete: () => {
        this.estoyCargando = false;
      },
    });
  }

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //ON SUBMIT EDITANDO O AGREGANDO USUARIO CON ALERT VALIDACION ADAPTADA HTTP
  onSubmit() {
    if (this.usuarioForm.invalid) {
      alert('Hay errores en el formulario');
    } else {
      
      // CREANDO FAKE
      const fakeToken = btoa(Math.random().toString(36).substring(2) + Date.now().toString(36));
      const usuarioDataToken = {...this.usuarioForm.value, "token": fakeToken};


      if (this.estoyEditId) {       
        this.usuarioService.editarUsuario(this.estoyEditId.toString(),usuarioDataToken).subscribe({
          next: (res) => {    
            this.usuariosData = [...this.usuariosData.filter((alu) => alu.id != res.id), res]
            this.estoyEditId = null;
          }
        });
      } else {
        // SI NO ESTOY EDITANDO, AGREGAR NUEVO PRODUCTO ADAPTADA HTTP
        this.usuarioService.agregarUsuario(usuarioDataToken).subscribe({
          next: (res) => {
            this.usuariosData = [...this.usuariosData, res]
          }
        });  
      }
      this.usuarioForm.reset();
    }
    
  }

  // BORRAR USUARIO ADAPTADA HTTP
  onBorrarUsuario(id: number | string) {
    if (confirm('Estas seguro que quieres eliminar el usuario?')) {
      this.usuarioService.borrarUsuario(id.toString()).subscribe({
        next: (res) => { this.usuariosData = res}
      }
      )
    }
  }

  // EDITAR USUARIO
  onEditarUsuario(alu: Usuario) {
    this.estoyEditId = alu.id;   
    this.usuarioForm.patchValue(alu);
  }

  // DESUSCRIBIRME A USUARIOS OBS
  ngOnDestroy(): void {
    this.usuariosSubscription?.unsubscribe();
  }

}
