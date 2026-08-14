import { Component, inject } from '@angular/core';
import { CreateRestaurantFormComponent } from "../../components/molecules/create-restaurant-form.component/create-restaurant-form.component";

import { RestaurantInterface } from '../../interfaces/restaurant/restaurant-interface';
import { RestaurantGlobalService } from '../../services/global/restaurant-global.service';
import { ServiceTableListComponent } from '../../components/organisms/service-table-list.component/service-table-list.component';
import { SectionTitleComponent } from "../../components/atoms/section-title.component/section-title.component";

@Component({
  selector: 'app-home.component',
  imports: [CreateRestaurantFormComponent, ServiceTableListComponent, SectionTitleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
	restaurantGlobalService = inject(RestaurantGlobalService);
}
