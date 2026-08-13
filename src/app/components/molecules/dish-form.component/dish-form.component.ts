import { Component, inject, signal } from '@angular/core';
import { DishService } from '../../../services/api/dish/dish.service';
import { RestaurantGlobalService } from '../../../services/global/restaurant-global.service';
import { AlertService } from '../../../services/alert/alert.service';
import { Router } from '@angular/router';
import { form, maxLength, minLength, required, FormField } from '@angular/forms/signals';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';
import { CategoryInterface } from '../../../interfaces/category/category-interface';
import { SectionTitleComponent } from "../../atoms/section-title.component/section-title.component";

@Component({
  selector: 'app-dish-form',
  imports: [FormField, SectionTitleComponent, SectionTitleComponent],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.css',
})
export class DishFormComponent {
  	dishService = inject(DishService);
	alertService = inject(AlertService);

	dishModel = signal({
		name: '',
		description: '',
		time: 0,
		price: 0,
		category: {} as CategoryInterface
	});

	dishForm = form(this.dishModel, (fieldPath) => {
		required(fieldPath.name, {message: 'Name is required'});
		minLength(fieldPath.name, 4, {message: 'Enter a valid name'});
		maxLength(fieldPath.name, 100, {message: 'Enter a valid name less than 50 characters'});
	});

	public onSubmit(event: Event): void {
		event.preventDefault();

		const { name, description, time, price, category } = this.dishModel();

		this.dishService.createDish({
			name,
			description,
			time,
			price,
			category
		}).subscribe({
			next: (res) => {
				this.dishService.addDish(res.dishList[0]);
				this.alertService.show(res.message, MessageTypesEnum.SUCCESS);

				this.dishModel.set({ 
					name: '',
					description: '',
					time: 0,
					price: 0,
					category: {} as CategoryInterface
				});
			},

			error: (err) => {
				console.log("Ha ocurrido un error: ", err);
			}
		});
	}
}
