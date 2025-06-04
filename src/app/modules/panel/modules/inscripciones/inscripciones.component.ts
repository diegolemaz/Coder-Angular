import { Component } from '@angular/core';
import { Inscripcion } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InscripcionService } from './inscripcion.service';



@Component({
  selector: 'app-inscripciones',
  standalone: false,
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent {

  inscripcionForm: FormGroup;
  inscripcionesData: Inscripcion[] = [];
  estoyEditId: number | null = null;
  estoyCargando = false;

  // VALIDACIONES Y SERV

  inscripcionesSubscription: Subscription | null = null;


  constructor(private fb: FormBuilder, private inscripcionService: InscripcionService) {


    this.loadInscripcionesObservable(); // llamando obs

    this.inscripcionForm = this.fb.group({
      studentId: ['', [Validators.required]],
      courseId: ['', [Validators.required]],
    });
  }

  // LOAD insc OBS
  loadInscripcionesObservable() {
    this.estoyCargando = true;
    this.inscripcionesSubscription = this.inscripcionService.getInscripciones$().subscribe({
      next: (datos) => {
        this.inscripcionesData = datos;
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
        this.inscripcionService.editarInscripcion(this.estoyEditId.toString(), this.inscripcionForm.value).subscribe({
          next: () => {
            this.inscripcionService.getInscripciones$().subscribe((inscripciones) => {
              this.inscripcionesData = inscripciones; //ACTUALIZA LA TABLA
            });
            this.estoyEditId = null;
          }
        });
      } else {
        // SI NO ESTOY EDITANDO, AGREGAR NUEVO PRODUCTO ADAPTADA HTTP
        this.inscripcionService.agregarInscripcion(this.inscripcionForm.value).subscribe({
          next: () => {
            this.inscripcionService.getInscripciones$().subscribe((inscripciones) => {
              this.inscripcionesData = inscripciones;  //ACTUALIZA LA TABLA
            });
          }
        });
      }
      this.inscripcionForm.reset();
    }
  }
  
  // BORRAR INSCRIPCION ADAPTADA HTTP
  onBorrarInscripcion(id: number | string) {
    if (confirm('Estas seguro que quieres eliminar la inscripcion?')) {
      this.inscripcionService.borrarInscripcion(id.toString()).subscribe({
        next: (res) => { this.inscripcionesData = res }
      })
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