import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { Curso, CursoForm } from './models';
import { HttpClient } from '@angular/common/http';


@Injectable( {providedIn: 'root'} )
export class CursoService {
  constructor(private http: HttpClient){}

    // GET ALUMNOS Y BORRARALUMNO HTTP

    getCursos$(): Observable<Curso[]> { return this.http.get<Curso[]>(`http://localhost:3000/courses`)
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
}

