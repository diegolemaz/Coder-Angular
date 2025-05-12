import { Injectable } from "@angular/core";
import { Alumno } from "./models";
import { Observable } from "rxjs";

const alumnos_db: Alumno[] = [
    
    { doc: 232323, nombre: 'Juan', apellido: 'Gonzalez' },
    { doc: 678564, nombre: 'Maria', apellido: 'Melendez'},
    {
      doc: 752435,
      nombre: 'Gaston',
      apellido: 'Martinez'
         },
    { doc: 353990, nombre: 'Marcelo', apellido: 'Perez' },
    { doc: 847897, nombre: 'Juliana', apellido: 'Mendez'},
    { doc: 396735, nombre: 'Romina', apellido: 'Franchi' },
    { doc: 855756, nombre: 'Jorge', apellido: 'Mestoy' },
    { doc: 506783, nombre: 'Gustavo', apellido: 'Madrin'},
    {
      doc: 506123,
      nombre: 'Solana',
      apellido: 'Rodriguez'
    },
    { doc: 590704, nombre: 'Pablo', apellido: 'Benitez' },
    { doc: 647546, nombre: 'Rodrigo', apellido: 'Perez' },
  
];

@Injectable( {providedIn: 'root'} )
export class AlumnoService  {

    // ALUMNOS OBSERVABLE
    
    getAlumnos$(): Observable<Alumno[]> {
        const alumnosObservable = new Observable<Alumno[]>((observer) => {
          setTimeout(() => {
            observer.next(alumnos_db); 
            observer.complete(); 
          }, 2000);

        });
        return alumnosObservable;
      }

}

