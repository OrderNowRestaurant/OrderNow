import { Component, inject, signal } from '@angular/core';
import { RestaurantService } from '../../../services/api/restaurant/resturant.service';
import { form, FormField, minLength, required } from "@angular/forms/signals";
import { AlertService } from '../../../services/alert/alert.service';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';

@Component({
  selector: 'app-create-restaurant-form',
  imports: [FormField],
  templateUrl: './create-restaurant-form.component.html',
  styleUrl: './create-restaurant-form.component.css',
})
export class CreateRestaurantFormComponent {
	restaurantService = inject(RestaurantService);
	alertService = inject(AlertService);

	restaurantModel = signal({
		name: ''
	});

	restaurantForm = form(this.restaurantModel, (fieldPath) => {
		required(fieldPath.name, {message: 'Name is required'});
		minLength(fieldPath.name, 4, {message: 'Enter a valid name'});
	});

	public onSubmit(event: Event): void {
		event.preventDefault();

		const { name } = this.restaurantModel();

		this.restaurantService.createRestaurant({ name }).subscribe({
			next: (res) => {
				this.alertService.show(res.message, MessageTypesEnum.SUCCESS);
			},

			error: (err) => {
				console.log("Ha ocurrido un error: ", err);
			}
		});
	}
}
