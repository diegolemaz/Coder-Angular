import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Curso } from "../models";

export const CursosActions = createActionGroup({
    source: "Cursos",
    events: {
        'Cargar Cursos': emptyProps(),
        'Cargar Cursos Success': props<{ cursos: Curso[] }>(), 
        'Cargar Cursos Failure': props<{ error: string }>(),

        'Editar Curso': props<{ curso: Curso }>(),
        'Editar Curso Success': props<{ curso: Curso }>(),
        'Editar Curso Failure': props<{ error: string }>(),

     
        'Agregar Curso': props<{ curso: Curso }>(),
        'Agregar Curso Success': props<{ curso: Curso }>(),
        'Agregar Curso Failure': props<{ error: string }>(),

        'Borrar Curso': props<{ curso: Curso }>(),
        'Borrar Curso Success': props<{ cursos: Curso[] }>(),
        'Borrar Curso Failure': props<{ error: string }>(),
    },
});