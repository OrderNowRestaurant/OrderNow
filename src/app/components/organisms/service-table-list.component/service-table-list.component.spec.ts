import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTableListComponent } from './service-table-list.component';

describe('ServiceTableListComponent', () => {
  let component: ServiceTableListComponent;
  let fixture: ComponentFixture<ServiceTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceTableListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceTableListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
