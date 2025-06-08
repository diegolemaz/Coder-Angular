import { Injectable } from '@angular/core';
import { Inscripcion, InscripcionForm } from './models';
import { concatMap, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  constructor(private http: HttpClient) {}

  // GET INSCRIPCIONES  Y BORRAR HTTP

  getInscripciones$(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(
      `http://localhost:3000/inscriptions?_embed=course&_embed=student`
    );
  }

  existInscripcion$(aluId: number, curId: number): Observable<boolean> {
    return this.http
      .get<Inscripcion[]>(
        `http://localhost:3000/inscriptions?_embed=course&_embed=student&student.id=${aluId}&courseId=${curId}`
      )
      .pipe(
        map((inscripciones: Inscripcion[]) => inscripciones.length > 0
          // inscripciones.some(
          //   (i: Inscripcion) => i.student?.doc === aluDoc && i.cursoId === curId
          // )
        )
      );
  }

  borrarInscripcion(id: string): Observable<Inscripcion[]> {
    return this.http
      .delete<Inscripcion[]>(`http://localhost:3000/inscriptions/${id}`)
      .pipe(concatMap(() => this.getInscripciones$()));
  }
  // AGREGAR INSC HTTP
  agregarInscripcion(inscripcion: InscripcionForm): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(
      `http://localhost:3000/inscriptions/`,
      inscripcion
    );
  }

  // EDITAR INSC HTTP
  editarInscripcion(
    id: string,
    inscripcion: InscripcionForm
  ): Observable<Inscripcion> {
    return this.http.put<Inscripcion>(
      `http://localhost:3000/inscriptions/${id}`,
      inscripcion
    );
  }

  // TRAER INSCRIPCIONES DE UN ALUMNOID
  getInscripcionesId(studentID: string): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(
      `http://localhost:3000/inscriptions?_embed=course&studentId=${studentID}`
    );
  }
}
