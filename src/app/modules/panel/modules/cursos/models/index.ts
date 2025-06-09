import { Alumno } from "../../alumnos/models";
import { Inscripcion } from "../../inscripciones/models";

export interface Curso {
    id: number;
    desc: string;
    horas: number;
    clases: number;
    profesor: string;
    student?: Alumno;
    inscriptions?: Inscripcion;
}

export interface CursoForm {
    id: number;
    desc: string;
    horas: number;
    clases: number;
    profesor: string;
}