import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OrderInterface } from '../../interfaces/order/order-interface';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket!: WebSocket;
    private newOrderSubject = new Subject<any>();

    constructor() {
        this.connect();
    }

    private connect() {
        const token = localStorage.getItem('token');

        this.socket = new WebSocket(`ws://${environment.URL_BASE}/ws-order?token=${token}`);

        this.socket.onmessage = (event) => {
            try {
                const pedido = JSON.parse(event.data);
                this.newOrderSubject.next(pedido);
            } catch (e) {
                this.newOrderSubject.next(event.data);
            }
        };
    }

    public obtainOrdersStream(): Observable<OrderInterface> {
        return this.newOrderSubject.asObservable();
    }
}