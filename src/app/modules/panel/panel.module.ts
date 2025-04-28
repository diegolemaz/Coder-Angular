import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
// IMPORTAMOS EL PANEL MATERIAL
import { MatSidenavModule } from '@angular/material/sidenav';
// IMPORTAMOS BOTONES MATERIAL
import { MatButtonModule } from '@angular/material/button';
// IMPORTAMOS TOOLBAR
import { MatToolbarModule } from '@angular/material/toolbar';

// IMPORTAMOS ICONOS
import { MatIconModule } from '@angular/material/icon';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

// IMPORTAMOS LISTA
import { MatListModule } from '@angular/material/list';
import { AlumnosModule } from './modules/alumnos/alumnos.module';

@NgModule({
  declarations: [PanelComponent, NavMenuComponent],
  imports: [
    CommonModule,
    PanelRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    AlumnosModule,
  ],
  exports: [PanelComponent],
})
export class PanelModule {}
