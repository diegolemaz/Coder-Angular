import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { Curso, CursoForm } from './models';
import { HttpClient } from '@angular/common/http';
import { Inscripcion } from '../inscripciones/models';


@Injectable( {providedIn: 'root'} )
export class CursoService {
  constructor(private http: HttpClient){}

    // GET ALUMNOS Y BORRARALUMNO HTTP
    getCursos$(): Observable<Curso[]> { return this.http.get<Curso[]>(`http://localhost:3000/courses?_sort=desc`)
    }

    borrarCurso(id: string): Observable<Curso[]>{
      return this.http
      .delete<Curso[]>(`http://localhost:3000/courses/${id}`)
      .pipe(concatMap(() => this.getCursos$()));
    }
    
        // AGREGAR CURSO HTTP
        agregarCurso(curso : CursoForm): Observable<Curso>{
          return this.http
          .post<Curso>(`http://localhost:3000/courses/`, curso);
        }

            // EDITAR CURSO HTTP
    editarCurso(id: string, curso: CursoForm): Observable<Curso> {
      return this.http
      .put<Curso>(`http://localhost:3000/courses/${id}`, curso);
    }

    // TRAER ALUMNOS INSCRIPTOS POR ID DE CURSO
       getInscriptosByCourseId(courseid: string | null): Observable<Inscripcion []  > {
      return this.http.get<Inscripcion []>(`http://localhost:3000/inscriptions?_embed=course&_embed=student&courseId=${courseid}`)
    }

    // TRAER DATOS DEL CURSO POR COURSEID
    getCursoId (id: string): Observable<Curso | null > { return this.http.get<Curso>(`http://localhost:3000/courses/${id}`)
    
}

}

