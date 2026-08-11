import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBudgetComponent } from './status-budget.component';

describe('StatusBudgetComponent', () => {
  let component: StatusBudgetComponent;
  let fixture: ComponentFixture<StatusBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBudgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBudgetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
