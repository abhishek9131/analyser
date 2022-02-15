import { Routes } from '@angular/router';
import AnalyzerComponent from './analyzer/analyzer.component';
import { SelectionPendingComponent } from './selection-pending/selection-pending.component';

import SharedComponent from './shared.component';

export const ROUTES: Routes = [{
    path: 'analyzer/:userId',
    component: AnalyzerComponent,
    loadChildren: () => import('./analyzer/analyzer.module')
        .then(m => m.AnalyzerModule)
},
{
    path: '',
    component: SelectionPendingComponent,
    loadChildren: () => import('./selection-pending/selection-pending.module')
        .then(m => m.SelectionPendingModule)
}];
