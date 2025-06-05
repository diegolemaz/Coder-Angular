import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CursosActions } from './cursos.actions';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { CursoService } from '../curso.service';
import { Curso } from '../models/index';

@Injectable()
export class CursosEffects {
  loadCursos$;
  editarCurso$;
  agregarCurso$;
  borrarCurso$;

  constructor(private actions$: Actions, private cursosServ: CursoService) {
    this.loadCursos$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.cargarCursos), // INTERCERPTAR LA ACCION DE CARGAR CURSOS
        concatMap(() =>
          this.cursosServ.getCursos$().pipe(
            map((cursos) => CursosActions.cargarCursosSuccess({ cursos })), // RESPUESTA CON EXITO
            catchError(
              (error) =>
                of(CursosActions.cargarCursosFailure({ error: error.message })) // RESPUESTA CON ERROR
            )
          )
        )
      );
    });

    this.editarCurso$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.editarCurso), // INTERCERPTAR LA ACCION DE EDITAR CURSO
        switchMap(({ curso }) =>
          this.cursosServ.editarCurso(curso.id.toString(), curso).pipe(
            map((cursoActualizado) =>
              CursosActions.editarCursoSuccess({ curso: cursoActualizado }) // RESPUESTA CON EXITO
            ),
            catchError((error) =>
              of(CursosActions.editarCursoFailure({ error: error.message })) // RESPUESTA CON ERROR
            )
          )
        )
      );
    });

    this.agregarCurso$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.agregarCurso), // INTERCERPTAR LA ACCION DE AGREGAR CURSO
        switchMap(({ curso }) =>
          this.cursosServ.agregarCurso(curso).pipe(
            map((nuervoCurso) =>
              CursosActions.agregarCursoSuccess({ curso: nuervoCurso })  // RESPUESTA CON EXITO
            ),
            catchError((error) =>
              of(CursosActions.editarCursoFailure({ error: error.message }))  // RESPUESTA CON ERROR
            )
          )
        )
      );
    });

    this.borrarCurso$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.borrarCurso),  // INTERCERPTAR LA ACCION DE BORRAR CURSO
        switchMap(({ curso }) =>
          this.cursosServ.borrarCurso(curso.id.toString()).pipe(
            map((cursos) =>
              CursosActions.borrarCursoSuccess({ cursos: cursos }) // REESPUESTA CON EXITO
            ),
            catchError((error) =>
              of(CursosActions.editarCursoFailure({ error: error.message }))  // RESPUESTA CON ERROR
            )
          )
        )
      );
    });
  }
}
