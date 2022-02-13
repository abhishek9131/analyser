import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedComponent from './shared.component';
import { ROUTES } from './shared.routing';

@NgModule({
    declarations: [ SharedComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES)
    ]
})
export class sharedModule {}
