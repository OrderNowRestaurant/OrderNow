import { Component, inject } from '@angular/core';
import { OrderService } from '../../../services/api/order/order.service';
import { WebSocketService } from '../../../services/ws/web-socket.service';

@Component({
  selector: 'app-order-list',
  imports: [],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent {
	orderService = inject(OrderService);
	webSocketService = inject(WebSocketService);

	ngOnInit() {
		this.webSocketService.obtenerPedidosStream().subscribe(nuevoPedido => {
			console.log("NUEVO PEDIDO!");
		});
	}
}
