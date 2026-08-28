import { Component, inject } from '@angular/core';
import { TableInterface } from '../../../interfaces/table/table-interface';
import { TableService } from '../../../services/api/table/table.service';
import { FormServiceTableComponent } from "../../molecules/form-service-table.component/form-service-table.component";
import { TableCardComponent } from "../../atoms/table-card.component/table-card.component";
import { ErrorResponseInterface } from '../../../interfaces/responses/error-response';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';
import { AlertService } from '../../../services/alert/alert.service';
import { QrPdfService } from '../../../services/pdf/qr-pdf.service';

@Component({
  selector: 'app-service-table-list',
  imports: [FormServiceTableComponent, TableCardComponent],
  templateUrl: './service-table-list.component.html',
  styleUrl: './service-table-list.component.css',
})
export class ServiceTableListComponent {
	tableService = inject(TableService);
	alertService = inject(AlertService);
	qrPdfService = inject(QrPdfService);
	downloadingPdf = false;

	ngOnInit(): void {
		this.loadTables();
	}

	public loadTables() {
		this.tableService.getAllTables().subscribe({
			next: (res) => {
				this.tableService.setTables(res.tables);
			},

			error: (err: ErrorResponseInterface) => {
                this.alertService.show(err.error.message, MessageTypesEnum.SUCCESS);
            }
		});
	}


	public onTableDeleted(deletedToken: string) {
		const updatedTables = this.tableService.tableList().filter(
			table => table.qrToken !== deletedToken
		);
		
		this.tableService.setTables(updatedTables);
	}

	public async downloadQrCodes(): Promise<void> {
		this.downloadingPdf = true;
		try {
			await this.qrPdfService.downloadTablesQrCodes(this.tableService.tableList());
		} catch {
			this.alertService.show('No se pudo generar el PDF de los códigos QR', MessageTypesEnum.ERROR);
		} finally {
			this.downloadingPdf = false;
		}
	}
}
