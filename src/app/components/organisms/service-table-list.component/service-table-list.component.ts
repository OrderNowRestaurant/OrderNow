import { Component, inject } from '@angular/core';
import { TableInterface } from '../../../interfaces/table/table-interface';
import { TableService } from '../../../services/api/table/table.service';
import { FormServiceTableComponent } from "../../molecules/form-service-table.component/form-service-table.component";
import { TableCardComponent } from "../../atoms/table-card.component/table-card.component";

@Component({
  selector: 'app-service-table-list',
  imports: [FormServiceTableComponent, TableCardComponent],
  templateUrl: './service-table-list.component.html',
  styleUrl: './service-table-list.component.css',
})
export class ServiceTableListComponent {
	tableService = inject(TableService);

	ngOnInit(): void {
		this.loadTables();
	}

	public loadTables() {
		this.tableService.getAllTables().subscribe({
			next: (res) => {
				this.tableService.setTables(res.tables);
			},

			error: (err) => {

			}
		});
	}


	public onTableDeleted(deletedToken: string) {
		const updatedTables = this.tableService.tableList().filter(
			table => table.qrToken !== deletedToken
		);
		
		this.tableService.setTables(updatedTables);
	}
}
