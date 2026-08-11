import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesComponent } from './dishes.component';

describe('DishesComponent', () => {
  let component: DishesComponent;
  let fixture: ComponentFixture<DishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DishesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
