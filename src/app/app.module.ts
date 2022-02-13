import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import AppComponent from './app.component';
import { ROUTES } from './app.routing';
import HeaderComponent from './core/components/header/header.component';
import SubHeaderModule from './core/components/sub-header/sub-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubHeaderModule
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
