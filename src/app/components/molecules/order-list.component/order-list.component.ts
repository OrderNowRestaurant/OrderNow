import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../../../services/api/order/order.service';
import { WebSocketService } from '../../../services/ws/web-socket.service';
import { OrderInterface } from '../../../interfaces/order/order-interface';
import { OrderCardComponent } from "../../atoms/order-card.component/order-card.component";
import { AlertService } from '../../../services/alert/alert.service';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';
import { ErrorResponseInterface } from '../../../interfaces/responses/error-response';

@Component({
  selector: 'app-order-list',
  imports: [OrderCardComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent {
	private orderService = inject(OrderService);
	private webSocketService = inject(WebSocketService);
	alertService = inject(AlertService);

	public orderList = signal<OrderInterface[]>([]);

	ngOnInit() {
		this.orderService.getAllOrders().subscribe({
			next: (data) => {
				this.orderList.set(data.orderList);
			},

			error: (err: ErrorResponseInterface) => {
				this.alertService.show(err.error.message, MessageTypesEnum.ERROR);
			}
		});

		this.webSocketService.obtainOrdersStream().subscribe({
			next: (order) => {
				this.orderList.update((prev) => [...prev, order]);
			},

			error: (err: ErrorResponseInterface) => {
				this.alertService.show(err.error.message, MessageTypesEnum.ERROR);
			}		
		});
	}

	public removeOrder(orderId: number) {
		this.orderList.update((orders) => orders.filter((order) => order.idOrder !== orderId));
	}
}
