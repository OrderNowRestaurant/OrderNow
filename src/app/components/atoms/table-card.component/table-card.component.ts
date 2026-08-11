import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, output, signal, ViewChild } from '@angular/core';
import { TableInterface } from '../../../interfaces/table/table-interface';
import { QrCodeComponent } from "../../molecules/qr-code.component/qr-code.component";
import { TableStatusDialogComponent } from '../../dialogs/table-status-dialog.component/table-status-dialog.component';
import { StatusBudgetComponent } from "../status-budget.component/status-budget.component";
import { TableService } from '../../../services/api/table/table.service';

@Component({
  selector: 'app-table-card',
  standalone: true,
  imports: [CommonModule, QrCodeComponent, TableStatusDialogComponent, StatusBudgetComponent],
  templateUrl: './table-card.component.html',
  styleUrl: './table-card.component.css',
})
export class TableCardComponent {
	tableSignal = signal<TableInterface>({} as TableInterface);
	tableService = inject(TableService);

	tableDeletedSignal = output<string>();

	@ViewChild(TableStatusDialogComponent) statusDialog!: TableStatusDialogComponent;

	public openStatusDialog() {
		this.statusDialog.open(); 
	}

	@Input({ required: true }) 
	set table(value: TableInterface) {
		this.tableSignal.set(value);
	}

	public onStatusChanged(newStatus: string) {
		this.tableSignal.update(currentTable => ({
		...currentTable,
		status: newStatus
		}));
	}

	public deleteTable() {
		this.tableService.deleteTable(this.tableSignal().qrToken).subscribe({
			next: (res) => {
				this.tableDeletedSignal.emit(this.tableSignal().qrToken);
				console.error("Poner error en la table card");
			},
			error: (err) => {
				console.error("Poner error en la table card");
			}
		});
	}
}
