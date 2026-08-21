import { Service } from '@angular/core';
import { ServerApiService } from '../server/server-api.service';
import { Observable } from 'rxjs';
import { OrderResponseInterface } from '../../../interfaces/responses/orders/order-response';

@Service()
export class OrderService extends ServerApiService {
    public getAllOrders(): Observable<OrderResponseInterface> {
        return this.get<OrderResponseInterface>("order/get");
    }
}
