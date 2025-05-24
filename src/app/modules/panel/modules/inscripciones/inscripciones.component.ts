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
      doc: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(9999), Validators.max(9999999)]],
      cursoId: ['', [Validators.required, Validators.pattern('[0-9]+')]],
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

  
  //ON SUBMIT EDITANDO O AGREGANDO INSC CON ALERT VALIDACION ADAPTADA HTTP
  onSubmit() {
    if (this.inscripcionForm.invalid) {
      alert('Hay errores en el formulario de inscripcion');
    } else {
      if (this.estoyEditId) {       
        this.inscripcionService.editarInscripcion(this.estoyEditId.toString(),this.inscripcionForm.value).subscribe({
          next: (res) => {    
            this.inscripcionesData = [...this.inscripcionesData.filter((insc) => insc.id != res.id), res]
            this.estoyEditId = null;
          }
        });
      } else {
        // SI NO ESTOY EDITANDO, AGREGAR NUEVO PRODUCTO ADAPTADA HTTP
        this.inscripcionService.agregarInscripcion(this.inscripcionForm.value).subscribe({
          next: (res) => {
            this.inscripcionesData = [...this.inscripcionesData, res]
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
        next: (res) => { this.inscripcionesData = res}
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
