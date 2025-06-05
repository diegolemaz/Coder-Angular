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
        ofType(CursosActions.cargarCursos), // INTERCERPTAR LA ACCION DE CARGAR PEDIDOS
        concatMap(() =>
          this.cursosServ.getCursos$().pipe(
            map((cursos) => CursosActions.cargarCursosSuccess({ cursos })), // REESPUESTA CON EXITO
            catchError(
              (error) =>
                of(CursosActions.cargarCursosFailure({ error: error.message })) // RESPUESTA CON ERRORES
            )
          )
        )
      );
    });

    this.editarCurso$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.editarCurso),
        switchMap(({ curso }) =>
          this.cursosServ.editarCurso(curso.id.toString(), curso).pipe(
            map((cursoActualizado) =>
              CursosActions.editarCursoSuccess({ curso: cursoActualizado })
            ),
            catchError((error) =>
              of(CursosActions.editarCursoFailure({ error: error.message }))
            )
          )
        )
      );
    });

    this.agregarCurso$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.agregarCurso),
        switchMap(({ curso }) =>
          this.cursosServ.agregarCurso(curso).pipe(
            map((nuervoCurso) =>
              CursosActions.agregarCursoSuccess({ curso: nuervoCurso })
            ),
            catchError((error) =>
              of(CursosActions.editarCursoFailure({ error: error.message }))
            )
          )
        )
      );
    });

    this.borrarCurso$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursosActions.borrarCurso),
        switchMap(({ curso }) =>
          this.cursosServ.borrarCurso(curso.id.toString()).pipe(
            map((cursos) =>
              CursosActions.borrarCursoSuccess({ cursos: cursos })
            ),
            catchError((error) =>
              of(CursosActions.editarCursoFailure({ error: error.message }))
            )
          )
        )
      );
    });
  }
}
