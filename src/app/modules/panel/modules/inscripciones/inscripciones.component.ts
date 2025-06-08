import { Component } from '@angular/core';
import { Inscripcion } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { InscripcionService } from './inscripcion.service';
import { Alumno } from '../alumnos/models/index';
import { AlumnoService } from '../alumnos/alumno.services';
import { Curso } from '../cursos/models';
import { CursoService } from '../cursos/curso.service';

@Component({
  selector: 'app-inscripciones',
  standalone: false,
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss',
})
export class InscripcionesComponent {
  inscripcionForm: FormGroup;
  inscripcionesData: Inscripcion[] = [];
  estoyEditId: number | null = null;
  estoyCargando = false;
  alumnos: Alumno[] = [];
  cursos: Curso[] = [];

  // VALIDACIONES Y SERV

  inscripcionesSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private inscripcionService: InscripcionService,
    private alumnoService: AlumnoService,
    private cursoService: CursoService
  ) {
    this.loadInscripcionesObservable(); // llamando obs
    this.loadAlumnosObservable();
    this.loadCursoObservable();

    this.inscripcionForm = this.fb.group({
      studentId: ['', [Validators.required]],
      courseId: ['', [Validators.required]],
    });
  }

  // LOAD insc OBS
  loadInscripcionesObservable() {
    this.estoyCargando = true;
    this.inscripcionesSubscription = this.inscripcionService
      .getInscripciones$()
      .subscribe({
        next: (datos) => {
          this.inscripcionesData = datos;
        },
        error: (error) => console.error(error),
        complete: () => {
          this.estoyCargando = false;
        },
      });
  }

  loadAlumnosObservable() {
    this.estoyCargando = true;
    this.alumnoService.getAlumnos$().subscribe({
      next: (datos) => {
        this.alumnos = datos;
      },
      error: (error) => console.error(error),
      complete: () => {
        this.estoyCargando = false;
      },
    });
  }

  loadCursoObservable() {
    this.estoyCargando = true;
    this.cursoService.getCursos$().subscribe({
      next: (datos) => {
        this.cursos = datos;
      },
      error: (error) => console.error(error),
      complete: () => {
        this.estoyCargando = false;
      },
    });
  }

  //ON SUBMIT EDITANDO O AGREGANDO INSC CON ALERT VALIDACION ADAPTADA HTTP Y ACTUALIZA TABLA
  onSubmit() {
    if (this.inscripcionForm.invalid) {
      alert('Hay errores en el formulario de inscripcion');
    } else {
      if (this.estoyEditId) {
        this.validarEditar().subscribe((valido) => {
          if (valido) {
            this.inscripcionService
              .editarInscripcion(this.estoyEditId?.toString()!, this.inscripcionForm.value)
              .subscribe({
                next: () => {
                  this.inscripcionService
                    .getInscripciones$()
                    .subscribe((inscripciones) => {
                      this.inscripcionesData = inscripciones; //ACTUALIZA LA TABLA
                    });
                  this.estoyEditId = null;
                },
              });
            this.inscripcionForm.reset();
          } else {
            alert('Ya existe la inscripción');
          }
        });
      } else {
        // Estoy Agrega
        this.validarAgregar().subscribe((valido) => {
          if (valido) {
            // SI NO ESTOY EDITANDO, AGREGAR NUEVO PRODUCTO ADAPTADA HTTP
            this.inscripcionService
              .agregarInscripcion(this.inscripcionForm.value)
              .subscribe({
                next: () => {
                  this.inscripcionService
                    .getInscripciones$()
                    .subscribe((inscripciones) => {
                      this.inscripcionesData = inscripciones; //ACTUALIZA LA TABLA
                    });
                },
              });
            this.inscripcionForm.reset();
          } else {
            alert('Ya existe la inscripción');
          }
        });
      }
    }
  }

  // VALIDACIONES PARA AGREGAR 
  validarAgregar(): Observable<boolean> {
    const studentId = this.inscripcionForm.get('studentId')?.value;
    const courseId = this.inscripcionForm.get('courseId')?.value;

    return this.inscripcionService
      .existInscripcion$(studentId, courseId)
      .pipe(map((valida) => !valida));
  }

  // VALIDACIONES PARA EDITAR 
  validarEditar(): Observable<boolean> {
    const studentId = this.inscripcionForm.get('studentId')?.value;
    const courseId = this.inscripcionForm.get('courseId')?.value;
    // BUSCA LA INSCRIPCION CON LOS DATOS DE PANTALLA
    return this.inscripcionService
      .obtenerInscripcion$(studentId, courseId)
      // BUSCO SI HAY INSCRIPCION NO SIENDO LA ORIGINAL
      .pipe(map((inscripciones) => inscripciones.length == 0 || inscripciones[0]?.id == this.estoyEditId));
  }

  // BORRAR INSCRIPCION ADAPTADA HTTP
  onBorrarInscripcion(id: number | string) {
    if (confirm('Estas seguro que quieres eliminar la inscripcion?')) {
      this.inscripcionService.borrarInscripcion(id.toString()).subscribe({
        next: (res) => {
          this.inscripcionesData = res;
        },
      });
    }
  }

  // EDITAR INSCRIPCION
  onEditarInscripcion(insc: Inscripcion) {
    this.estoyEditId = insc.id;
    this.inscripcionForm.patchValue(insc);
  }

  // DESUSCRIBIRME A INSCR OBS
  ngOnDestroy(): void {
    this.inscripcionesSubscription?.unsubscribe();
  }
}
