import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { Curso } from './models';
import { HttpClient } from '@angular/common/http';


// const cursos_db: Curso[] = [
    
//     { id: 1, desc: 'Angular'},
//     { id: 2, desc: 'React Js'},
//     { id: 3, desc: 'JavaScript'},
//     { id: 4, desc: 'Diseño Web'},
//     { id: 5, desc: 'Typescript'},
//     { id: 6, desc: 'Vue JS'},
//     { id: 7, desc: 'Backend 1'},
//     { id: 8, desc: 'Backend 2'},
//     { id: 9, desc: 'Backend 3'},
//     { id: 10, desc: 'Javascript'},
//     { id: 11, desc: 'Marketing' },

// ];

@Injectable( {providedIn: 'root'} )
export class CursoService {
  constructor(private http: HttpClient){}

    // CURSOS OBSERVABLE
    
    // getCursos$(): Observable<Curso[]> {
    //     const cursosObservable = new Observable<Curso[]>((observer) => {
    //       setTimeout(() => {
    //         observer.next(cursos_db); 
    //         observer.complete(); 
    //       }, 2000);

    //     });
    //     return cursosObservable;
    //   }

    // GET ALUMNOS Y BORRARALUMNO HTTP

    getCursos$(): Observable<Curso[]> { return this.http.get<Curso[]>(`http://localhost:3000/courses`)
    }

    borrarCurso(id: string): Observable<Curso[]>{
      return this.http
      .delete<Curso[]>(`http://localhost:3000/courses/${id}`)
      .pipe(concatMap(() => this.getCursos$()));
    }
}

