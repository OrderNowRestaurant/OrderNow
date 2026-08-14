import { Component, inject, signal, Output, EventEmitter } from '@angular/core';
import { DishService } from '../../../services/api/dish/dish.service';
import { RestaurantGlobalService } from '../../../services/global/restaurant-global.service';
import { AlertService } from '../../../services/alert/alert.service';
import { Router } from '@angular/router';
import { form, maxLength, minLength, required, FormField } from '@angular/forms/signals';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';
import { CategoryInterface } from '../../../interfaces/category/category-interface';
import { SectionTitleComponent } from "../../atoms/section-title.component/section-title.component";
import { CategoryService } from '../../../services/api/category/category.service';

@Component({
  selector: 'app-dish-form',
  imports: [FormField, SectionTitleComponent, SectionTitleComponent],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.css',
})
export class DishFormComponent {
  	dishService = inject(DishService);
	alertService = inject(AlertService);
	categoryService = inject(CategoryService);

	@Output() editSuccess = new EventEmitter<void>();

	public editMode = signal(false);
	private originalName: string | null = null;

	public categoryList: CategoryInterface[] = [];

	ngOnInit() {
		this.categoryService.getCategories().subscribe({
			next: (res) => {
				this.categoryList = res.categoryList;
			},

			error: () => {

			}
		});
	}

	dishModel = signal({
		name: '',
		description: '',
		time: 0,
		price: 0,
		categoryName: ''
	});

	dishForm = form(this.dishModel, (fieldPath) => {
		required(fieldPath.name, {message: 'Name is required'});
		minLength(fieldPath.name, 4, {message: 'Enter a valid name'});
		maxLength(fieldPath.name, 100, {message: 'Enter a valid name less than 50 characters'});
	});

	public onSubmit(event: Event): void {
		event.preventDefault();

		if (this.editMode()) {
			this.editDish();
		} else {
			this.createDish();
		}
	}

	public setEditMode(dish: any) {
		this.editMode.set(true);
		this.originalName = dish.name;
		this.dishModel.set({
			name: dish.name ?? '',
			description: dish.description ?? '',
			time: dish.time ?? 0,
			price: dish.price ?? 0,
			categoryName: dish.category?.name ?? dish.categoryName ?? ''
		});
	}

	public clearEditMode() {
		this.editMode.set(false);
		this.originalName = null;
		this.dishModel.set({ 
			name: '',
			description: '',
			time: 0,
			price: 0,
			categoryName: ''
		});
	}

	private createDish() {
		const { name, description, time, price, categoryName } = this.dishModel();

		this.dishService.createDish({
			name,
			description,
			time,
			price,
			categoryName
		}).subscribe({
			next: (res) => {
				this.dishService.addDish(res.dishList[0]);
				this.alertService.show(res.message, MessageTypesEnum.SUCCESS);

				this.dishModel.set({ 
					name: '',
					description: '',
					time: 0,
					price: 0,
					categoryName: ''
				});
			},

			error: (err) => {
				console.log("Ha ocurrido un error: ", err);
			}
		});
	}

	private editDish() {
		const { name, description, time, price, categoryName } = this.dishModel();

		this.dishService.editDish({
			originalName: this.originalName ?? undefined,
			name,
			description,
			time,
			price,
			categoryName
		}).subscribe({
			next: (res) => {
				this.dishService.updateDish(res.dishList[0], this.originalName ?? undefined);
				this.alertService.show(res.message, MessageTypesEnum.SUCCESS);

				this.clearEditMode();
				this.editSuccess.emit();
			},

			error: (err) => {
				console.log("Ha ocurrido un error: ", err);
			}
		});
	}
}
