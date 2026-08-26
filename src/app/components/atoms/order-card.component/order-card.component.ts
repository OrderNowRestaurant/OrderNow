import { Component, inject, input } from '@angular/core';
import { OrderInterface } from '../../../interfaces/order/order-interface';
import { OrderService } from '../../../services/api/order/order.service';

@Component({
  selector: 'app-order-card',
  imports: [],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent {
	orderService = inject(OrderService);
	order = input.required<OrderInterface>();

	ngOnInit() {
		console.log(this.order().dishList);
	}

	public removeOrder() {
		this.orderService.removeOrder(this.order()).subscribe({
			next: (data) => {
				console.log(data);
			},

			error: () => {

			}
		});
	}
}
