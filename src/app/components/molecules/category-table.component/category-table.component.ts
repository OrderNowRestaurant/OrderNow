import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../services/api/category/category.service';
import { AlertService } from '../../../services/alert/alert.service';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';
import { ErrorResponseInterface } from '../../../interfaces/responses/error-response';


@Component({
  selector: 'app-category-table',
  imports: [],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css',
})
export class CategoryTableComponent {
	categoryService = inject(CategoryService);
	alertService = inject(AlertService);

	ngOnInit(): void {
		this.loadCategories();
	}

	public loadCategories() {
		this.categoryService.getOwnCategories().subscribe({
			next: (res) => {
				
				if(res.categoryList != null && res.categoryList.length != 0) {
					this.categoryService.setCategoryList(res.categoryList);
				}

			},
			error: (err: ErrorResponseInterface) => {
			}
		});
	}

	public onDeleteCategory(name: string) {
		this.categoryService.deleteCategory(name).subscribe({
			next: (res) => {
				const updated = this.categoryService.categoryList().filter(category => category.name !== name);

				this.categoryService.setCategoryList(updated);

				this.alertService.show(res.message, MessageTypesEnum.SUCCESS);
			},
			error: (err: ErrorResponseInterface) => {
				this.alertService.show(err.error.message, MessageTypesEnum.ERROR);
			}
		});
	}
}
