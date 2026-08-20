import { Component, inject, signal } from '@angular/core';
import { SectionTitleComponent } from "../../atoms/section-title.component/section-title.component";
import { form, maxLength, minLength, required, FormField } from '@angular/forms/signals';
import { CategoryService } from '../../../services/api/category/category.service';
import { AlertService } from '../../../services/alert/alert.service';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';
import { ErrorResponseInterface } from '../../../interfaces/responses/error-response';

@Component({
  selector: 'app-category-form',
  imports: [SectionTitleComponent, FormField],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent {
	categoryService = inject(CategoryService);
	alertService = inject(AlertService);

  	categoryModel = signal({
		name: ''
	});

	categoryForm = form(this.categoryModel, (fieldPath) => {
		required(fieldPath.name, {message: 'Name is required'});
		minLength(fieldPath.name, 4, {message: 'Enter a valid name'});
		maxLength(fieldPath.name, 100, {message: 'Enter a valid name less than 50 characters'});
	});

	public onSubmit(event: Event): void {
		event.preventDefault();

		const { name } = this.categoryModel();
		
		this.categoryService.createCategory(name).subscribe({
			next: (res) => {
				this.categoryService.addCategory(res.categoryList[0])
				this.alertService.show(res.message, MessageTypesEnum.SUCCESS);

				this.categoryModel.set({ 
					name: ''
				});
			},

			error: (err: ErrorResponseInterface) => {
				this.alertService.show(err.error.message, MessageTypesEnum.ERROR);
			}
		});
	}
}
