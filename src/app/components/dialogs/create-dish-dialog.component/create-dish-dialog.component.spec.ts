import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDishDialogComponent } from './create-dish-dialog.component';

describe('CreateDishDialogComponent', () => {
  let component: CreateDishDialogComponent;
  let fixture: ComponentFixture<CreateDishDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDishDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDishDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
