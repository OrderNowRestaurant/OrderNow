import { Component, Input, input, signal } from '@angular/core';
import { DishInterface } from '../../../interfaces/dish/dish-interface';

@Component({
  selector: 'app-dish-card',
  imports: [],
  templateUrl: './dish-card.component.html',
  styleUrl: './dish-card.component.css',
})
export class DishCardComponent {
	dishSignal = signal({} as DishInterface);

	@Input({ required: true }) 
	set dish(value: DishInterface) {
		this.dishSignal.set(value);
	}
}
