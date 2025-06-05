import { createFeature, createReducer, on, Store } from '@ngrx/store';
import { CursosActions } from './cursos.actions';
import { Curso } from '../models';
import { map } from 'rxjs';
import { CursosEffects } from './cursos.effects';

export interface CursosState {
  cursos: Curso[];
  estoyCargando: boolean;
  error: string | null;
}

const initialState: CursosState = {
  cursos: [],
  estoyCargando: false,
  error: null,
};

const cursosReducer = createReducer(
  initialState,

   // ACCION CARGAR CURSOS
  on(CursosActions.cargarCursos, (state) => {
    return {
      ...state,
      estoyCargando: true,
      error: null,
    };
  }),

  on(CursosActions.cargarCursosSuccess, (state, action) => {
    return {
      ...state,
      cursos: action.cursos,
      estoyCargando: false,
      error: null,
    };
  }),

  on(CursosActions.cargarCursosFailure, (state, action) => {
    return {
      ...state,
      cursos: [],
      estoyCargando: false,
      error: action.error,
    };
  }),

 // ACCION EDITAR CURSO
  on(CursosActions.editarCursoSuccess, (state, action) => {
    return {
      ...state,
      cursos: state.cursos.map((curso) =>
        curso.id === action.curso.id ? { ...curso, ...action.curso } : curso
      ),
    };
  }),

  on(CursosActions.editarCursoFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),

 // ACCION AGREGAR CURSO
  on(CursosActions.agregarCursoSuccess, (state, action) => {
    return {
      ...state,
      cursos: [...state.cursos, action.curso],      
    };
  }),

  on(CursosActions.agregarCursoFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),

    // ACCION BORRAR CURSO
  on(CursosActions.borrarCursoSuccess, (state, action) => {
    return {
      ...state,
      cursos: action.cursos,
    };
  }),

  on(CursosActions.borrarCursoFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);

export const cursosFeature = createFeature({
  name: 'cursos',
  reducer: cursosReducer,
});
