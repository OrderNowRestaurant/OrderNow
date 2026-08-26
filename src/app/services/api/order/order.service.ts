import { Service } from '@angular/core';
import { ServerApiService } from '../server/server-api.service';
import { Observable } from 'rxjs';
import { OrderResponseInterface } from '../../../interfaces/responses/orders/order-response';
import { OrderInterface } from '../../../interfaces/order/order-interface';

@Service()
export class OrderService extends ServerApiService {
    public getAllOrders(): Observable<OrderResponseInterface> {
        return this.get<OrderResponseInterface>("order/get");
    }

    public removeOrder(order: OrderInterface): Observable<OrderResponseInterface> {
        return this.post<OrderResponseInterface>("order/remove", {
            order: order
        });
    }
}
