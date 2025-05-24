import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Alumno } from './models/index';
import { AlumnoService } from './alumno.services';
import { first, Observable, Subscription, take } from 'rxjs';
import { AutenticacionService } from '../../../../core/services/autenticacion.service';
import { User } from '../../../../core/models';

@Component({
  selector: 'app-alumnos',
  standalone: false,
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss',
})
export class AlumnosComponent {
  alumnoForm: FormGroup;
  alumnosData: Alumno[] = [];
  estoyEditId: number | null = null;
  estoyCargando = false;
// PARA DESHABILITAR FORM
   autUsuario$: Observable<User | null>;

  // VALIDACIONES Y SERVICIOS

  alumnosSubscription: Subscription | null = null;

  constructor(private fb: FormBuilder, private alumnoService: AlumnoService, private autServ: AutenticacionService) {
  
    this.loadAlumnosObservable(); // llamando obs
    
    // PARA DESHABILITAR FORM
    this.autUsuario$ = this.autServ.autenticacionUser$;

    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      doc: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(9999), Validators.max(9999999)]],
    });
  }

  // LOAD ALUMNOS OBS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  loadAlumnosObservable() {
    this.estoyCargando = true;
    this.alumnosSubscription = this.alumnoService.getAlumnos$().subscribe({
      next: (datos) => {
        this.alumnosData = datos;
      },
      error: (error) => console.error(error),
      complete: () => {
        this.estoyCargando = false;
      },
    });
  }

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //ON SUBMIT EDITANDO O AGREGANDO ALUMNO CON ALERT VALIDACION ADAPTADA HTTP
  onSubmit() {
    if (this.alumnoForm.invalid) {
      alert('Hay errores en el formulario');
    } else {
      if (this.estoyEditId) {       
        this.alumnoService.editarAlumno(this.estoyEditId.toString(),this.alumnoForm.value).subscribe({
          next: (res) => {    
            this.alumnosData = [...this.alumnosData.filter((alu) => alu.id != res.id), res]
            this.estoyEditId = null;
          }
        });
      } else {
        // SI NO ESTOY EDITANDO, AGREGAR NUEVO PRODUCTO ADAPTADA HTTP
        this.alumnoService.agregarAlumno(this.alumnoForm.value).subscribe({
          next: (res) => {
            this.alumnosData = [...this.alumnosData, res]
          }
        });  
      }
      this.alumnoForm.reset();
    }
    
  }

  // BORRAR ALUMNO ADAPTADA HTTP
  onBorrarAlumno(id: number | string) {
    if (confirm('Estas seguro que quieres eliminar el alumno?')) {
      this.alumnoService.borrarAlumno(id.toString()).subscribe({
        next: (res) => { this.alumnosData = res}
      }
      )
    }
  }

  // EDITAR ALUMNO
  onEditarAlumno(alu: Alumno) {
    this.estoyEditId = alu.id;   
    this.alumnoForm.patchValue(alu);
  }

  // DESUSCRIBIRME A ALUMNOS OBS
  ngOnDestroy(): void {
    this.alumnosSubscription?.unsubscribe();
  }

}

