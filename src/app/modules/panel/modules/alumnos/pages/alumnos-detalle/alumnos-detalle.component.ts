import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../alumno.services';
import { Observable, of, switchMap } from 'rxjs';
import { Alumno } from '../../models';
import { InscripcionService } from '../../../inscripciones/inscripcion.service';
import { Inscripcion } from '../../../inscripciones/models';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-alumnos-detalle',
  standalone: false,
  templateUrl: './alumnos-detalle.component.html',
  styles: ``
})
export class AlumnosDetalleComponent {

  alumno$: Observable<Alumno | null>;
 inscripcion$: Observable<Inscripcion []>
 dataSource = new MatTableDataSource<Inscripcion>();


 // TABLA

displayedColumns: string[] = ['id', 'cursoId'];




constructor (private activRoute: ActivatedRoute, private aluServ: AlumnoService, private inscServ: InscripcionService  ) {
  const alumnoId = this.activRoute.snapshot.params['id'];
  this.alumno$ = this.aluServ.getAlumnoById(alumnoId);

  
  this.inscripcion$ = this.alumno$.pipe(
      switchMap((alumno) => {
        if (alumno && alumno.doc) {
          let docString = alumno.doc.toString();
          return this.inscServ.getInscripcionesDoc(docString);
       
        }
       return of([]);
       
      })        
    );
   
    this.inscripcion$.subscribe(inscripciones => {
      this.dataSource.data = inscripciones; 
    });


}
}
