// restaurant.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RestaurantGlobalService } from '../services/global/restaurant-global.service';

export const restaurantResolver: ResolveFn<boolean> = () => {
  const globalService = inject(RestaurantGlobalService);
  return globalService.loadRestaurant();
};