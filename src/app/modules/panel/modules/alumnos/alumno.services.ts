import { Injectable } from "@angular/core";
import { Alumno } from "./models";
import { Observable } from "rxjs";

const alumnos_db: Alumno[] = [
    
    { doc: 232323, nombre: 'Juan', apellido: 'Gonzalez', curso: 'Angular' },
    { doc: 678564, nombre: 'Maria', apellido: 'Melendez', curso: 'React Js' },
    {
      doc: 752435,
      nombre: 'Gaston',
      apellido: 'Martinez',
      curso: 'JavaScript',
    },
    { doc: 353990, nombre: 'Marcelo', apellido: 'Perez', curso: 'Diseño Web' },
    { doc: 847897, nombre: 'Juliana', apellido: 'Mendez', curso: 'Angular' },
    { doc: 396735, nombre: 'Romina', apellido: 'Franchi', curso: 'React Js' },
    { doc: 855756, nombre: 'Jorge', apellido: 'Mestoy', curso: 'Javascript' },
    { doc: 506783, nombre: 'Gustavo', apellido: 'Madrin', curso: 'Marketing' },
    {
      doc: 506123,
      nombre: 'Solana',
      apellido: 'Rodriguez',
      curso: 'Marketing',
    },
    { doc: 590704, nombre: 'Pablo', apellido: 'Benitez', curso: 'React Js' },
    { doc: 647546, nombre: 'Rodrigo', apellido: 'Perez', curso: 'Angular' },
  
];

@Injectable( {providedIn: 'root'} )
export class AlumnoService  {
    getAlumnos(): Alumno[] { 
        console.log('trayendo alumnos');
        return[...alumnos_db];
    }

    // ALUMNOS OBSERVABLE
    
    getAlumnos$(): Observable<Alumno[]> {
        const alumnosObservable = new Observable<Alumno[]>((observer) => {
          setTimeout(() => {
            observer.next(alumnos_db); // Emit the data
            observer.complete(); // Complete the observable after emitting the data
          }, 3000);

        });
        return alumnosObservable;
      }

}

