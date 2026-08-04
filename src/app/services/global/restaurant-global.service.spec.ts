import { TestBed } from '@angular/core/testing';

import { RestaurantGlobalService } from './restaurant-global.service';

describe('RestaurantGlobalService', () => {
  let service: RestaurantGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
