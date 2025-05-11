import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CursosComponent } from './cursos.component';
import { CursosTablaComponent } from './components/cursos-tabla/cursos-tabla.component';




@NgModule({
  declarations: [
    CursosComponent, CursosTablaComponent, 
  ],
  imports: [
    CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule
  ],
  exports: [CursosComponent]
})
export class CursosModule { }
