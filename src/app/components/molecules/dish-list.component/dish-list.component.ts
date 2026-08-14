import { Component, computed, inject, signal } from '@angular/core';
import { output } from '@angular/core';
import { DishService } from '../../../services/api/dish/dish.service';
import { DishInterface } from '../../../interfaces/dish/dish-interface';
import { DishCardComponent } from '../../atoms/dish-card.component/dish-card.component';
import { CategoryService } from '../../../services/api/category/category.service';
import { CategoryInterface } from '../../../interfaces/category/category-interface';

@Component({
  selector: 'app-dish-list',
  imports: [DishCardComponent],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.css',
})
export class DishListComponent {
	dishService = inject(DishService);
	categoryService = inject(CategoryService);

	public categoryList: CategoryInterface[] = [];
	public readonly filter = signal('');

	public readonly filteredDishes = computed<DishInterface[]>(() => {
		const dishes = this.dishService.dishList();
		const currentFilter = this.filter().trim();

		if (!currentFilter) {
			return dishes;
		}

		return dishes.filter((dish) => dish.category?.name === currentFilter);
	});

	// Emit dish to parent when user requests edit
	dishEdit = output<DishInterface>();

	ngOnInit(): void {
		this.loadDishes();
		this.loadCategories();
	}

	public loadDishes() {
		this.dishService.getDishes().subscribe({
			next: (res) => {
				this.dishService.setDishList(res.dishList);
			},

			error: (err) => {

			}
		});
	}

	public loadCategories() {
		this.categoryService.getCategories().subscribe({
			next: (res) => {
				this.categoryList = res.categoryList;
			},

			error: () => {

			}
		})
	}

	public onCategoryChange(event: Event): void {
		const select = event.target as HTMLSelectElement;
		this.filter.set(select.value ?? "");
	}

	public onDishDeleted(deletedName: string) {
		const updatedDish = this.dishService.dishList().filter(
			dish => dish.name !== deletedName
		);
		
		this.dishService.setDishList(updatedDish);
	}

	public onDishEdit(dish: DishInterface) {
		this.dishEdit.emit(dish);
	}
}
