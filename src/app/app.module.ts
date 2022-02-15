import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import AppComponent from './app.component';
import { AppRoutingModule } from './app-routing.module';
import SubHeaderModule from './components/sub-header/sub-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import AnalyzerComponent from './components/analyzer/analyzer.component';
import { SelectionPendingComponent } from './components/selection-pending/selection-pending.component';
import { MaterialModule } from './core/material.module';
import HeaderComponent from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubHeaderModule,
    AnalyzerComponent,
    SelectionPendingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
