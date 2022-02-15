import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  exports: [
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    MatTooltipModule,
    MatFormFieldModule
  ]
})
export class MaterialModule {}
