import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCardComponent } from './dish-card.component';

describe('DishCardComponent', () => {
  let component: DishCardComponent;
  let fixture: ComponentFixture<DishCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DishCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
