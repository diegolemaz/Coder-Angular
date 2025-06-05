import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CursosState } from "./cursos.reducer";

export const selectCursosState = createFeatureSelector<CursosState>('cursos');

// accede a los cursos
export const selectCursos = createSelector(selectCursosState, (state) => state.cursos);

export const selectCursoById = (idCurso: number | string) => createSelector(selectCursos,  (cursos) => cursos.find(curso => curso.id === idCurso));

// accede a variable estoycargando

export const selectCursosCargando = createSelector(selectCursosState, (state) => state.estoyCargando);
export const selectCursosEditando = createSelector(selectCursosState, (state) => state.estoyEditId);

// accede al error

export const selectCursosError = createSelector(selectCursosState, (state) => state.error);