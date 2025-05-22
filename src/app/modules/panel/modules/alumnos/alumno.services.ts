import { Injectable } from "@angular/core";

import { concatMap, Observable } from "rxjs";
import { Alumno } from './models/index';
import { HttpClient } from "@angular/common/http";


//const alumnos_db: Alumno[] = [
    
    // { doc: 232323, nombre: 'Juan', apellido: 'Gonzalez' },
    // { doc: 678564, nombre: 'Maria', apellido: 'Melendez'},
    // {
    //   doc: 752435,
    //   nombre: 'Gaston',
    //   apellido: 'Martinez'
    //      },
    // { doc: 353990, nombre: 'Marcelo', apellido: 'Perez' },
    // { doc: 847897, nombre: 'Juliana', apellido: 'Mendez'},
    // { doc: 396735, nombre: 'Romina', apellido: 'Franchi' },
    // { doc: 855756, nombre: 'Jorge', apellido: 'Mestoy' },
    // { doc: 506783, nombre: 'Gustavo', apellido: 'Madrin'},
    // {
    //   doc: 506123,
    //   nombre: 'Solana',
    //   apellido: 'Rodriguez'
    // },
    // { doc: 590704, nombre: 'Pablo', apellido: 'Benitez' },
    // { doc: 647546, nombre: 'Rodrigo', apellido: 'Perez' },
  
//];

@Injectable( {providedIn: 'root'} )
export class AlumnoService  {
  constructor(private http: HttpClient){}

    // ALUMNOS OBSERVABLE
    
    // getAlumnos$(): Observable<Alumno[]> {
    //     const alumnosObservable = new Observable<Alumno[]>((observer) => {
    //       setTimeout(() => {
    //         observer.next(alumnos_db); 
    //         observer.complete(); 
    //       }, 2000);

    //     });
    //     return alumnosObservable;
    //   }

  
  // PROMESA QUE BORRAMOS GET ALUMNOS
  
    // getAlumnos(): Promise<Alumno[]>{
  //   const alumnosPromise = new Promise<Alumno[]>((resolve, reject) => {
  //     setTimeout(() => {
  //           reject ('error al traer alumnos');
  //           resolve
  //         }, 2000);
  //   });
  //   return alumnosPromise;
 // }


// GET ALUMNOS Y BORRARALUMNO HTTP

    getAlumnos$(): Observable<Alumno[]> { return this.http.get<Alumno[]>(`http://localhost:3000/students`)
    }

    borrarAlumno(id: string): Observable<Alumno[]>{
      return this.http
      .delete<Alumno[]>(`http://localhost:3000/students/${id}`)
      .pipe(concatMap(() => this.getAlumnos$()));
    }
}

