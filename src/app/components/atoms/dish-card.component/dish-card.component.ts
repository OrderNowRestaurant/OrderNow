import { Component, inject, Input, output, signal } from '@angular/core';
import { DishInterface } from '../../../interfaces/dish/dish-interface';
import { DishService } from '../../../services/api/dish/dish.service';
import { AlertService } from '../../../services/alert/alert.service';
import { ErrorResponseInterface } from '../../../interfaces/responses/error-response';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrl: './dish-card.component.css'
})
export class DishCardComponent {
	dishSignal = signal({} as DishInterface);
	dishService = inject(DishService);
	alertService = inject(AlertService);

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
				this.alertService.show(res.message, MessageTypesEnum.SUCCESS);
			},
			error: (err: ErrorResponseInterface) => {
				this.alertService.show(err.error.message, MessageTypesEnum.ERROR);
			}
		});
	}

	public editDish() {
		this.editDishSignal.emit(this.dishSignal());
	}
}
