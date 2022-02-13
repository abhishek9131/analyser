import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionPendingComponent } from './selection-pending.component';

describe('SelectionPendingComponent', () => {
  let component: SelectionPendingComponent;
  let fixture: ComponentFixture<SelectionPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
