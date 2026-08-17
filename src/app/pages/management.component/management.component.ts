import { Component, inject } from '@angular/core';
import { RestaurantService } from '../../services/api/restaurant/resturant.service';
import { RestaurantGlobalService } from '../../services/global/restaurant-global.service';
import { Router } from '@angular/router';
import { SectionTitleComponent } from "../../components/atoms/section-title.component/section-title.component";
import { CategoryTableComponent } from "../../components/molecules/category-table.component/category-table.component";

@Component({
  selector: 'app-management.component',
  imports: [SectionTitleComponent, CategoryTableComponent, CategoryTableComponent],
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
