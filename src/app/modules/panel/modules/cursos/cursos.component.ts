import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Curso } from './models';
import { first, Observable, Subscription, take } from 'rxjs';
import { CursoService } from './curso.service';
import { AutenticacionService } from '../../../../core/services/autenticacion.service';
import { User } from '../../../../core/models';

@Component({
  selector: 'app-cursos',
  standalone: false,
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {


  cursoForm: FormGroup;
  cursosData: Curso[] = [];
  estoyEditId: number | null = null;
  estoyCargando = false;

  // PARA DESHABILITAR FORM
     autUsuario$: Observable<User | null>;

  // VALIDACIONES Y SERVICIO


  cursosSubscription: Subscription | null = null;

  constructor(private fb: FormBuilder, private cursoService: CursoService, private autServ: AutenticacionService) {


    this.loadCursosObservable(); // llamando obs

      // PARA DESHABILITAR FORM
    this.autUsuario$ = this.autServ.autenticacionUser$;

    this.cursoForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      desc: ['', [Validators.required, Validators.minLength(3)]]
      });
  }

  // CARGO CURSOS OBS
  loadCursosObservable() {
    this.estoyCargando = true;
    this.cursosSubscription = this.cursoService.getCursos$().subscribe({
      next: (datos) => {
        this.cursosData = datos;
      },
      error: (error) => console.error(error),
      complete: () => {
        this.estoyCargando = false;
      },
    });
  }

  
  //ON SUBMIT EDITANDO O AGREGANDO CURSO CON ALERT VALIDACION ADAPTADA HTTP
    onSubmit() {
    if (this.cursoForm.invalid) {
      alert('Hay errores en el formulario');
    } else {
      if (this.estoyEditId) {       
        this.cursoService.editarCurso(this.estoyEditId.toString(),this.cursoForm.value).subscribe({
          next: (res) => {    
            this.cursosData = [...this.cursosData.filter((cur) => cur.id != res.id), res]
            this.estoyEditId = null;
          }
        });
      } else {
        // SI NO ESTOY EDITANDO, AGREGAR NUEVO PRODUCTO ADAPTADA HTTP
        this.cursoService.agregarCurso(this.cursoForm.value).subscribe({
          next: (res) => {
            this.cursosData = [...this.cursosData, res]
          }
        });  
      }
      this.cursoForm.reset();
    }
    
  }


  // BORRAR CURSO ADAPTADO HTTP
  onBorrarCurso(id: number | string) {
    if (confirm('Estas seguro que quieres eliminar el curso?')) {
      this.cursoService.borrarCurso(id.toString()).subscribe({
        next: (res) => { this.cursosData = res}
      })
    }
  }

  // EDITAR CURSO
  onEditarCurso(cur: Curso) {
    this.estoyEditId = cur.id;
    this.cursoForm.patchValue(cur);
  }

  // DESUSCRIBIRME A CURSOS OBS
  ngOnDestroy(): void {
    this.cursosSubscription?.unsubscribe();
  }
}
