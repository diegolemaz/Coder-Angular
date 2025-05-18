import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelModule } from './modules/panel/panel.module';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, PanelModule, 
  ],
  providers: [
    provideHttpClient (withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
