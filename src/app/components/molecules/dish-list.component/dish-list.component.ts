import { Component, inject } from '@angular/core';
import { DishService } from '../../../services/api/dish/dish.service';
import { DishInterface } from '../../../interfaces/dish/dish-interface';
import { DishCardComponent } from '../../atoms/dish-card.component/dish-card.component';

@Component({
  selector: 'app-dish-list',
  imports: [DishCardComponent],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.css',
})
export class DishListComponent {
	dishService = inject(DishService);

	ngOnInit(): void {
		this.loadDishes()
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


	public onTableDeleted(deletedName: string) {
		const updatedTables = this.dishService.dishList().filter(
			dish => dish.name !== deletedName
		);
		
		this.dishService.setDishList(updatedTables);
	}
}
