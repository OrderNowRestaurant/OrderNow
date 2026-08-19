import { Component, inject } from '@angular/core';

import { RestaurantGlobalService } from '../../services/global/restaurant-global.service';
import { CreateRestaurantFormComponent } from "../../components/molecules/create-restaurant-form.component/create-restaurant-form.component";

@Component({
  selector: 'app-home.component',
  imports: [CreateRestaurantFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  	restaurantGlobalService = inject(RestaurantGlobalService);

}
