import { Injectable } from "@angular/core";

import { concatMap, Observable } from "rxjs";
import { Alumno } from './models/index';
import { HttpClient } from "@angular/common/http";


@Injectable( {providedIn: 'root'} )
export class AlumnoService  {
  constructor(private http: HttpClient){}

// GET ALUMNOS Y BORRARALUMNO HTTP

    getAlumnos$(): Observable<Alumno[]> { return this.http.get<Alumno[]>(`http://localhost:3000/students`)
    }

    borrarAlumno(id: string): Observable<Alumno[]>{
      return this.http
      .delete<Alumno[]>(`http://localhost:3000/students/${id}`)
      .pipe(concatMap(() => this.getAlumnos$()));
    }

    
    agregarAlumno(id: string): Observable<Alumno[]>{
      return this.http
      .delete<Alumno[]>(`http://localhost:3000/students/${id}`)
      .pipe(concatMap(() => this.getAlumnos$()));
    }
}

