import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormServiceTableComponent } from './form-service-table.component';

describe('FormServiceTableComponent', () => {
  let component: FormServiceTableComponent;
  let fixture: ComponentFixture<FormServiceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormServiceTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormServiceTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
