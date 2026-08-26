import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../../../services/api/order/order.service';
import { WebSocketService } from '../../../services/ws/web-socket.service';
import { OrderInterface } from '../../../interfaces/order/order-interface';
import { OrderCardComponent } from "../../atoms/order-card.component/order-card.component";

@Component({
  selector: 'app-order-list',
  imports: [OrderCardComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent {
	private orderService = inject(OrderService);
	private webSocketService = inject(WebSocketService);

	public orderList = signal<OrderInterface[]>([]);

	ngOnInit() {
		this.orderService.getAllOrders().subscribe({
			next: (data) => {
				this.orderList.set(data.orderList);
				console.log(data);
			},

			error: (err) => {

			}
		});

		this.webSocketService.obtainOrdersStream().subscribe({
			next: (order) => {
				this.orderList.update((prev) => [...prev, order]);
			},

			error: (err) => {
			}		
		});
	}
}
