import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../curso.service';
import { Observable } from 'rxjs';
import { Curso } from '../../models';
import { InscripcionService } from '../../../inscripciones/inscripcion.service';
import { Inscripcion } from '../../../inscripciones/models';
import { MatTableDataSource } from '@angular/material/table';


CursoService
@Component({
  selector: 'app-cursos-detalle',
  standalone: false,
  templateUrl: './cursos-detalle.component.html',
  styles: ``
})
export class CursosDetalleComponent {

  alumnosInscriptos$: Observable<Inscripcion[]>;
  datosCurso$: Observable<Curso | null>
  dataSource = new MatTableDataSource<Inscripcion>();

  // TABLA

  displayedColumns: string[] = ['inscId', 'studentId', 'studentDoc', 'studentNombre'];


  constructor(private activRoute: ActivatedRoute, private curServ: CursoService, private inscServ: InscripcionService) {
    const cursoId = this.activRoute.snapshot.params['id'];
    this.alumnosInscriptos$ = this.curServ.getInscriptosByCourseId(cursoId);
    this.datosCurso$ = this.curServ.getCursoId(cursoId);
    this.datosCurso$.subscribe();

    this.alumnosInscriptos$.subscribe(aluInsc => {
      this.dataSource.data = aluInsc ?? [];
    });
  }
}
