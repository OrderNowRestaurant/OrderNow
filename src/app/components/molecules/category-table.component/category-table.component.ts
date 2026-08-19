import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../services/api/category/category.service';

@Component({
  selector: 'app-category-table',
  imports: [],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css',
})
export class CategoryTableComponent {
	categoryService = inject(CategoryService);

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
			error: () => {

			}
		});
	}

	public onDeleteCategory(name: string) {
		this.categoryService.deleteCategory(name).subscribe({
			next: () => {

				const updated = this.categoryService.categoryList().filter(category => category.name !== name);

				this.categoryService.setCategoryList(updated);
			},
			error: () => {

			}
		});
	}
}
