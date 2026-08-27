import { Component, inject, input, output } from '@angular/core';
import { OrderInterface } from '../../../interfaces/order/order-interface';
import { OrderService } from '../../../services/api/order/order.service';
import { ErrorResponseInterface } from '../../../interfaces/responses/error-response';
import { AlertService } from '../../../services/alert/alert.service';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';

@Component({
  selector: 'app-order-card',
  imports: [],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent {
	orderService = inject(OrderService);
	order = input.required<OrderInterface>();
	orderRemoved = output<number>();
	alertService = inject(AlertService);
	
	public removeOrder() {
		this.orderService.removeOrder(this.order()).subscribe({
			next: (data) => {
				this.orderRemoved.emit(this.order().idOrder);
			},

			error: (err: ErrorResponseInterface) => {
				this.alertService.show(err.error.message, MessageTypesEnum.ERROR);
			}
		});
	}
}
