import { Service } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Service()
export class WebSocketService {
    private socket!: WebSocket;
    private nuevoPedidoSubject = new Subject<any>();

    constructor() {
        this.conectar();
    }

    private conectar() {
        this.socket = new WebSocket('ws://localhost:8080/ws-order?token=' + localStorage.getItem('token'));

        this.socket.onmessage = (event) => {
            const pedido = JSON.parse(event.data);
            this.nuevoPedidoSubject.next(pedido); 
        };

        this.socket.onclose = () => {
            setTimeout(() => this.conectar(), 3000);
        };
    }

    public obtenerPedidosStream(): Observable<any> {
        return this.nuevoPedidoSubject.asObservable();
    }
}
