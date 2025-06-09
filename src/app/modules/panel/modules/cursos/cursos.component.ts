import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Curso } from './models';
import { Observable, Subscription } from 'rxjs';
import { AutenticacionService } from '../../../../core/services/autenticacion.service';
import { User } from '../../../../core/models';
import { Store } from '@ngrx/store';
import { CursosActions } from './store/cursos.actions';
import {
  selectCursoById,
  selectCursos,
  selectCursosCargando,
  selectCursosError,
} from './store/cursos.selector';

@Component({
  selector: 'app-cursos',
  standalone: false,
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss',
})

export class CursosComponent implements OnInit {
  cursoForm: FormGroup;
  cursosData: Curso[] = [];
  estoyEditId: number | null = null;
  estoyCargando = false;

  // PARA DESHABILITAR FORM
  autUsuario$: Observable<User | null>;

  // VALIDACIONES Y SERVICIO
  cursosSubscription: Subscription | null = null;

  // STORE
  cursos$: Observable<Curso[] | []>;
  estoyCargando$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private autServ: AutenticacionService,
    private store: Store
  ) {
    // STORE
    this.cursos$ = this.store.select(selectCursos);
    this.estoyCargando$ = this.store.select(selectCursosCargando);
    this.error$ = this.store.select(selectCursosError);

    this.loadCursosObservable(); // llamando obs

    // PARA DESHABILITAR FORM
    this.autUsuario$ = this.autServ.autenticacionUser$;

    this.cursoForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      desc: ['', [Validators.required, Validators.minLength(3)]],
      horas: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      clases: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      profesor: ['', [Validators.required, Validators.minLength(3)]],
    });

  }
  ngOnInit(): void {
    this.store.dispatch(CursosActions.cargarCursos());
  }

  // CARGO CURSOS ADAPTADA REDUX
  loadCursosObservable() {
    this.estoyCargando = true;
    this.store
      .select(selectCursos)
      .subscribe((cursos) => (this.cursosData = cursos));
  }

  //ON SUBMIT EDITANDO O AGREGANDO CURSO CON ALERT VALIDACION ADAPTADA REDUX
  onSubmit() {
    if (this.cursoForm.invalid) {
      alert('Hay errores en el formulario');
    } else {
      if (this.estoyEditId) {
        this.estoyEditId = null;
        this.store.dispatch(
          CursosActions.editarCurso({ curso: this.cursoForm.value })
        );
      } else {
        // SI NO ESTOY EDITANDO, AGREGAR NUEVO PRODUCTO ADAPTADA REDUX
        this.store.dispatch(
          CursosActions.agregarCurso({ curso: this.cursoForm.value })
        );
        this.estoyEditId = null;
      }
      this.cursoForm.reset();
    }
  }

  // BORRAR CURSO ADAPTADO REDUX
  onBorrarCurso(id: number | string) {
    if (confirm('Estas seguro que quieres eliminar el curso?')) {
      let cur: Curso | undefined;
      this.store.select(selectCursoById(id)).subscribe((c) => (cur = c));
      this.store.dispatch(
        CursosActions.borrarCurso({ curso: cur! })
      );
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
