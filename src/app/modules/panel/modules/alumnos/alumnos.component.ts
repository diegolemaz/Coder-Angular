import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Alumno } from './models/index';
import { AlumnoService } from './alumno.services';
import { first, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  standalone: false,
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss',
})
export class AlumnosComponent {
  alumnoForm: FormGroup;
  alumnosData: Alumno[] = [];
  estoyEditDoc: number | null = null;
  estoyCargando = false;

  // VALIDACIONES Y SERVICIOS

  alumnosSubscription: Subscription | null = null;

  constructor(private fb: FormBuilder, private alumnoService: AlumnoService) {
    // this.alumnoService.getAlumnos();

    this.loadAlumnosObservable(); // llamando obs

    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      doc: ['', [Validators.required, Validators.min(9999), Validators.max(9999999)]],
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

  //ON SUBMIT EDITANDO O AGREGANDO ALUMNO CON ALERT VALIDACION
  onSubmit() {
    if (this.alumnoForm.invalid) {
      alert('Hay errores en el formulario');
    } else {
      if (this.estoyEditDoc) {
        this.alumnosData = this.alumnosData.map((alu) =>
          alu.doc === this.estoyEditDoc
            ? { ...alu, ...this.alumnoForm.value }
            : alu
        );
      } else {
        // SI NO ESTOY EDITANDO, AGREGAR NUEVO PRODUCTO
        this.alumnosData = [...this.alumnosData, this.alumnoForm.value];
        this.estoyEditDoc = null;
      }
      this.alumnoForm.reset();
      this.estoyEditDoc = null;
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
    this.estoyEditDoc = alu.doc;
    this.alumnoForm.patchValue(alu);
  }

  // DESUSCRIBIRME A ALUMNOS OBS
  ngOnDestroy(): void {
    this.alumnosSubscription?.unsubscribe();
  }
}
