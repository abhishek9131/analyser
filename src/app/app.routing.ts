import { Routes } from '@angular/router';

export const ROUTES: Routes = [{
  path: '',
  // pathMatch: 'full',
  loadChildren: () => import('./shared-module/shared.module')
    .then(m => m.sharedModule).catch(e => console.error(e))
}];
