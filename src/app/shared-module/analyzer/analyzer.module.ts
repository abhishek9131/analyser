import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import AnalyzerComponent from './analyzer.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [ AnalyzerComponent ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTooltipModule
    ]
})
export class AnalyzerModule {}
