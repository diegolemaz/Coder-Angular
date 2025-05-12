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
  estoyEditDoc: number | null = null;
  estoyCargando = false;

  // VALIDACIONES Y SERV

  inscripcionesSubscription: Subscription | null = null;

  constructor(private fb: FormBuilder, private inscripcionService: InscripcionService) {


    this.loadInscripcionesObservable(); // llamando obs

    this.inscripcionForm = this.fb.group({
      doc: ['', [Validators.required, Validators.min(9999), Validators.max(9999999)]],
      cursoId: ['', [Validators.required]],
    });
  }

  // ALUMNOS OBS
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

  
  //ON SUBMIT EDITANDO O AGREGANDO INSC CON ALERT VALIDACION
  onSubmit() {
    if (this.inscripcionForm.invalid) {
      alert('Hay errores en el formulario de inscripcion');
    } else {
      if (this.estoyEditDoc) {
        this.inscripcionesData = this.inscripcionesData.map((insc) =>
          insc.doc === this.estoyEditDoc
            ? { ...insc, ...this.inscripcionForm.value }
            : insc
        );
      } else {
        // SI NO ESTOY EDITANDO, AGREGAR NUEVA INSC
        this.inscripcionesData = [...this.inscripcionesData, this.inscripcionForm.value];
        this.estoyEditDoc = null;
      }
      this.inscripcionForm.reset();
      this.estoyEditDoc = null;
    }
  }

  // BORRAR INSCRIPCION
  onBorrarInscripcion(docu: number) {
    if (confirm('Estas seguro que quieres eliminar la inscripcion?')) {
      this.inscripcionesData = this.inscripcionesData.filter((insc) => insc.doc !== docu);
    }
  }

  // EDITAR INSCRIPCION
  onEditarInscripcion(insc: Inscripcion) {
    this.estoyEditDoc = insc.doc;
    this.inscripcionForm.patchValue(insc);
  }

  // DESUSCRIBIRME A INSCR OBS
  ngOnDestroy(): void {
    this.inscripcionesSubscription?.unsubscribe();
  }

}
