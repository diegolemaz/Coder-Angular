import { Alumno } from "../../alumnos/models";
import { Curso } from "../../cursos/models";

export interface Inscripcion {
    id: number;
    doc: number,
    cursoId: number,
    student?: Alumno,
    course?: Curso

}

export interface InscripcionForm {
    id: number;
    doc: number,
    cursoId: number,
}