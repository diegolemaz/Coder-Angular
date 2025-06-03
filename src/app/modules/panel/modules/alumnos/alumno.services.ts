import { Injectable } from "@angular/core";

import { concatMap, map, Observable, Subscription } from 'rxjs';
import { Alumno, AlumnoForm } from './models/index';
import { HttpClient } from "@angular/common/http";


@Injectable( {providedIn: 'root'} )
export class AlumnoService  {
  constructor(private http: HttpClient){}

// GET ALUMNOS Y BORRARALUMNO HTTP

    getAlumnos$(): Observable<Alumno[]> { 
      return this.http.get<Alumno[]>(`http://localhost:3000/students`)
    }

    borrarAlumno(id: string): Observable<Alumno[]>{
      return this.http
      .delete<Alumno[]>(`http://localhost:3000/students/${id}`)
      .pipe(concatMap(() => this.getAlumnos$()));
    }

    // AGREGAR ALUMNO HTTP
    agregarAlumno(alumno : AlumnoForm): Observable<Alumno>{
      return this.http
      .post<Alumno>(`http://localhost:3000/students/`, alumno);
    }

    // EDITAR ALUMNO HTTP
    editarAlumno(id: string, alumno: AlumnoForm): Observable<Alumno> {
      return this.http
      .put<Alumno>(`http://localhost:3000/students/${id}`, alumno);
    }

    // TRAER ALUMNO POR DOC
    getAlumnoById(id: string | null): Observable<Alumno | null> {
      return this.http.get<Alumno>(`http://localhost:3000/students/${id}`)
    }
}

