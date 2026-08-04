import { Component, inject } from '@angular/core';
import { CreateRestaurantFormComponent } from "../../components/molecules/create-restaurant-form.component/create-restaurant-form.component";

import { RestaurantInterface } from '../../interfaces/restaurant/restaurant-interface';
import { RestaurantGlobalService } from '../../services/global/restaurant-global.service';

@Component({
  selector: 'app-home.component',
  imports: [CreateRestaurantFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
	restaurantGlobalService = inject(RestaurantGlobalService);
}
