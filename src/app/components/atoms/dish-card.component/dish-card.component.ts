import { Component, inject, Input, output, signal } from '@angular/core';
import { DishInterface } from '../../../interfaces/dish/dish-interface';
import { DishService } from '../../../services/api/dish/dish.service';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
})
export class DishCardComponent {
	dishSignal = signal({} as DishInterface);
	dishService = inject(DishService);

	tableDeletedSignal = output<string>();
	editDishSignal = output<DishInterface>();

	@Input({ required: true })
	set dish(value: DishInterface) {
		this.dishSignal.set(value);
	}

	public deleteDish() {
		this.dishService.deleteDish(this.dishSignal().name).subscribe({
			next: (res) => {
				this.tableDeletedSignal.emit(this.dishSignal().name);
				console.error("Poner error en la table card");
			},
			error: (err) => {
				console.error("Poner error en la table card");
			}
		});
	}

	public editDish() {
		this.editDishSignal.emit(this.dishSignal());
	}
}
