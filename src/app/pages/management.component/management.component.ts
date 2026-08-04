import { Component, inject } from '@angular/core';
import { RestaurantService } from '../../services/api/restaurant/resturant.service';
import { RestaurantGlobalService } from '../../services/global/restaurant-global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management.component',
  imports: [],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css',
})
export class ManagementComponent {
	restaurantService = inject(RestaurantService);
	restaurantGlobalService = inject(RestaurantGlobalService);
	router = inject(Router);


	public deleteRestaurant(): void {
		this.restaurantService.deleteRestaurant().subscribe({
			next: (res) => {
				if(!res.restaurant) {
					this.restaurantGlobalService.deleteLocalRestaurant();

					this.router.navigate(["/home"]);
				}
			},

			error: (error) => {
				
			}
		})
	}
}
