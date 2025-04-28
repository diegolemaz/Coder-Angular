import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Alumno } from './models/index';

@Component({
  selector: 'app-alumnos',
  standalone: false,
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss',
})
export class AlumnosComponent {
  alumnoForm: FormGroup;

  alumnosData: Alumno[] = [
    { doc: 232323, nombre: 'Juan', apellido: 'Gonzalez', curso: 'Angular' },
    { doc: 678564, nombre: 'Maria', apellido: 'Melendez', curso: 'React Js' },
    {
      doc: 752435,
      nombre: 'Gaston',
      apellido: 'Martinez',
      curso: 'JavaScript',
    },
    { doc: 353990, nombre: 'Marcelo', apellido: 'Perez', curso: 'Diseño Web' },
    { doc: 847897, nombre: 'Juliana', apellido: 'Mendez', curso: 'Angular' },
    { doc: 396735, nombre: 'Romina', apellido: 'Franchi', curso: 'React Js' },
    { doc: 855756, nombre: 'Jorge', apellido: 'Mestoy', curso: 'Javascript' },
    { doc: 506783, nombre: 'Gustavo', apellido: 'Madrin', curso: 'Marketing' },
    {
      doc: 506783,
      nombre: 'Solana',
      apellido: 'Rodriguez',
      curso: 'Marketing',
    },
    { doc: 590704, nombre: 'Pablo', apellido: 'Benitez', curso: 'React Js' },
    { doc: 647546, nombre: 'Rodrigo', apellido: 'Perez', curso: 'Angular' },
  ];

  estoyEditDoc: number | null = null;

  constructor(private fb: FormBuilder) {
    this.alumnoForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      doc: [''],
      curso: [''],
    });
  }

  //ON SUBMIT EDITANDO O AGREGANDO ALUMNO
  onSubmit() {
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

  // BORRAR ALUMNO
  onBorrarAlumno(docu: number) {
    if (confirm('Estas seguro que quieres eliminar el alumno?')) {
      this.alumnosData = this.alumnosData.filter((alu) => alu.doc !== docu);
    }
  }

  // EDITAR ALUMNO
  onEditarAlumno(alu: Alumno) {
    this.estoyEditDoc = alu.doc;
    this.alumnoForm.patchValue(alu);
  }
}
