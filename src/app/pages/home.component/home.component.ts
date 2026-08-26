import { Component, inject } from '@angular/core';

import { RestaurantGlobalService } from '../../services/global/restaurant-global.service';
import { CreateRestaurantFormComponent } from "../../components/molecules/create-restaurant-form.component/create-restaurant-form.component";
import { OrderListComponent } from '../../components/molecules/order-list.component/order-list.component';
import { SectionTitleComponent } from "../../components/atoms/section-title.component/section-title.component";

@Component({
  selector: 'app-home.component',
  imports: [CreateRestaurantFormComponent, OrderListComponent, SectionTitleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  	restaurantGlobalService = inject(RestaurantGlobalService);

}
