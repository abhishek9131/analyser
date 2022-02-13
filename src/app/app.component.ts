import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-gc-header></app-gc-header><app-gc-sub-header></app-gc-sub-header><router-outlet></router-outlet>'
})
export default class AppComponent {}
