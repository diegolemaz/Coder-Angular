import { TestBed } from '@angular/core/testing';

import { CursoService } from './curso.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Curso } from './models';

describe('CursosService', () => {
  let service: CursoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CursoService],
    });

    service = TestBed.inject(CursoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener los cursos', () => {
    const pruebaCursos: Curso[] = [{ id: 1, desc: 'Angular Avanzado' }];

    service.getCursos$().subscribe((cursos) => {
      expect(cursos.length).toBe(1);
      expect(cursos).toEqual(pruebaCursos);
    });

    const reqget = httpMock.expectOne('http://localhost:3000/courses');
    expect(reqget.request.method).toBe('GET');
    reqget.flush(pruebaCursos);
  });

  it('debería agregar un curso y devolverlo al listado', () => {
    const nuevoCurso: Curso = { id: 3, desc: 'Vue.js' };
    service.agregarCurso(nuevoCurso).subscribe((curso) => {
      expect(curso).toEqual(nuevoCurso);
    });
    const reqPost = httpMock.expectOne('http://localhost:3000/courses/');
    expect(reqPost.request.method).toBe('POST');
    reqPost.flush(nuevoCurso);
  });

  it('debería editar un curso y devolverlo al listado ', () => {
    const cursoOriginal: Curso = { id: 1, desc: 'Marketing' };
    const cursoEditado: Curso = { id: 1, desc: 'Macroeconomia' };

    service.editarCurso('1', cursoEditado).subscribe(curso => {
      expect(curso).toEqual(cursoEditado);
    });

    const reqPut = httpMock.expectOne('http://localhost:3000/courses/1');
    expect(reqPut.request.method).toBe('PUT');
    reqPut.flush(cursoEditado);
  });

});
