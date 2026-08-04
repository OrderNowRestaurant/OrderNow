import { ChangeDetectorRef, Component, ElementRef, input, ViewChild } from '@angular/core';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';
import { AlertInterface } from '../../../interfaces/alert-interface';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-message-dialog',
  imports: [],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.css',
})
export class MessageDialogComponent {
	public message = input.required<string>;

	@ViewChild('alertDialog') dialogRef!: ElementRef<HTMLDialogElement>;
  
	alert: AlertInterface | null = null;
	alertStyle: any = {};

	constructor(
		private alertService: AlertService, 
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.alertService.alert$.subscribe(alert => {

			if (alert) {
				this.alert = alert
				this.setStyles(alert.type);


				this.cdr.detectChanges(); 

				setTimeout(() => {
						const alert = this.dialogRef.nativeElement;

						if (alert.open) {
							alert.close();
						} 
							alert.show();
				}, 0);
				
			} else {
				if (this.dialogRef?.nativeElement.open) {
					this.dialogRef.nativeElement.close();
				}
				
				this.alert = null;
			}
		});
	}

	setStyles(type: MessageTypesEnum) {
		switch (type) {
			case MessageTypesEnum.ERROR:
				this.alertStyle = {
				'background-color': 'var(--error)'
				};
				break;
			case MessageTypesEnum.SUCCESS:
				this.alertStyle = {
				'background-color': 'var(--success)'
				};
				break;
			default:
				this.alertStyle = {
				'background-color': 'var(--error)'
			};
		}
	}

	close() {
		this.alertService.clear();
	}
}
