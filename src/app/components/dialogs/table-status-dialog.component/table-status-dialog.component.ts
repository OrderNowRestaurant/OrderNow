import { Component, ElementRef, inject, input, Input, output, ViewChild } from '@angular/core';
import { TableInterface } from '../../../interfaces/table/table-interface';
import { TableService } from '../../../services/api/table/table.service';
import { AlertService } from '../../../services/alert/alert.service';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';
import { ErrorResponseInterface } from '../../../interfaces/responses/error-response';

@Component({
  selector: 'app-table-status-dialog',
  imports: [],
  templateUrl: './table-status-dialog.component.html',
  styleUrl: './table-status-dialog.component.css',
})
export class TableStatusDialogComponent {
	tableService = inject(TableService);
	alertService = inject(AlertService);

	@ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
	status = input<string>('');
	table = input<TableInterface>({} as TableInterface);

	statusChanged = output<string>();
	
	public open() {
		this.dialog.nativeElement.showModal();
	}

	public close() {
		this.dialog.nativeElement.close();
	}

	public changeStatus(status: string) {
		this.tableService.updateStatus(status, this.table()).subscribe({
			next: (res) => {
				this.statusChanged.emit(status);
				this.close();
				this.alertService.show(res.message, MessageTypesEnum.SUCCESS);
			},
			 
			error: (err: ErrorResponseInterface) => {
				this.alertService.show(err.error.message, MessageTypesEnum.ERROR);
			}
		});
	}
}
