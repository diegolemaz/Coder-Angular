import { TestBed } from '@angular/core/testing';

import { CursoService } from './curso.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CursosService', () => {
  let service: CursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(CursoService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
