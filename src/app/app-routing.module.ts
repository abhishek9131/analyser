
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import AnalyzerComponent from './components/analyzer/analyzer.component';
import { SelectionPendingComponent } from './components/selection-pending/selection-pending.component';

const routes: Routes = [
  {
    path: '',
    component: SelectionPendingComponent
  },
  {
    path: 'analyzer/:callId',
    component: AnalyzerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
