import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosComponent } from './cursos.component';
import { CursosTablaComponent } from './components/cursos-tabla/cursos-tabla.component';
import { CursosRoutingModule } from './cursos-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { cursosFeature } from './store/cursos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './store/cursos.effects';

@NgModule({
  declarations: [CursosComponent, CursosTablaComponent],
  imports: [
    CommonModule,
    CursosRoutingModule, SharedModule, StoreModule.forFeature(cursosFeature), 
    EffectsModule.forFeature([CursosEffects]),

  ],
  exports: [CursosComponent],
})
export class CursosModule {}
