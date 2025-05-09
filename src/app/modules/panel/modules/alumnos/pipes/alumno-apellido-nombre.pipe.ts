import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../models';

@Pipe({
  name: 'alumnoApellidoNombre',
  standalone: false
})
export class AlumnoApellidoNombrePipe implements PipeTransform {

  transform(value: Alumno, ...args: unknown[]): string {
    return value.apellido + ', ' + value.nombre;
  }

}
