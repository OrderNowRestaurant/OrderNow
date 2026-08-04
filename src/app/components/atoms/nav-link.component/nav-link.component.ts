import { Component, inject, input } from '@angular/core';
import { RestaurantInterface } from '../../../interfaces/restaurant/restaurant-interface';
import { RestaurantGlobalService } from '../../../services/global/restaurant-global.service';

@Component({
  selector: 'app-nav-link',
  imports: [],
  templateUrl: './nav-link.component.html',
  styleUrl: './nav-link.component.css',
})
export class NavLinkComponent {
	public linkName = input.required<string>();
	public link = input.required<string>();

  restaurantGlobalService = inject(RestaurantGlobalService);

  restaurant?: RestaurantInterface = this.restaurantGlobalService.restaurant;
}
