import { Injectable } from '@angular/core';
import { Inscripcion } from './models';
import { concatMap, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// const inscripciones_db: Inscripcion[] = [
//   { doc: 232323, cursoId: 1 },
//   { doc: 232323, cursoId: 5 },
//   { doc: 678564, cursoId: 2 },
//   { doc: 678564, cursoId: 6 },
//   { doc: 752435, cursoId: 3 },
//   { doc: 752435, cursoId: 10 },
//   { doc: 353990, cursoId: 4 },
//   { doc: 847897, cursoId: 1 },
//   { doc: 396735, cursoId: 2 },
//   { doc: 855756, cursoId: 3 },
//   { doc: 506783, cursoId: 11 },
//   { doc: 506123, cursoId: 11 },
//   { doc: 590704, cursoId: 2 },
//   { doc: 647546, cursoId: 1 },
//   { doc: 647546, cursoId: 7 },

  
// ];

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  constructor (private http: HttpClient){}

  // INSCRIPCIONES OBSERVABLE
    
//     getInscripciones$(): Observable<Inscripcion[]> {
//         const inscripcionesObservable = new Observable<Inscripcion[]>((observer) => {
//           setTimeout(() => {
//             observer.next(inscripciones_db); 
//             observer.complete(); 
//           }, 2000);

//     });
//   return inscripcionesObservable;
// }

getInscripciones$(): Observable<Inscripcion[]>{ return this.http.get<Inscripcion[]>(`http://localhost:3000/inscriptions`)
}
      borrarInscripcion(id: string): Observable<Inscripcion[]>{
      return this.http
      .delete<Inscripcion[]>(`http://localhost:3000/inscriptions/${id}`)
      .pipe(concatMap(() => this.getInscripciones$()));
    }
}
