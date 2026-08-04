import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageTypesEnum } from '../../enums/MessageTypes.enum';
import { AlertInterface } from '../../interfaces/alert-interface';

@Injectable({
  providedIn: 'root',
})

export class AlertService {
    private alertSubject = new BehaviorSubject<AlertInterface | null>(null);
    alert$ = this.alertSubject.asObservable();

    private timeoutId: any;

    show(message: string, type:MessageTypesEnum = MessageTypesEnum.ERROR) {

		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}

		this.alertSubject.next({ message, type });

		this.timeoutId = setTimeout(() => {
			this.clear();
		}, 6000);
    }

    clear() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null; 
		}
		
		this.alertSubject.next(null);
    }
}
