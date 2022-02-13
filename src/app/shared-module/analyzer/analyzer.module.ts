import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import AnalyzerComponent from './analyzer.component';

@NgModule({
    declarations: [ AnalyzerComponent ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class AnalyzerModule {}
