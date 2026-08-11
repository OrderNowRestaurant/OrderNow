import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStatusDialogComponent } from './table-status-dialog.component';

describe('TableStatusDialogComponent', () => {
  let component: TableStatusDialogComponent;
  let fixture: ComponentFixture<TableStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableStatusDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableStatusDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
