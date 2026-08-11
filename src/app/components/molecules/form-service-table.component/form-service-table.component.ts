import { Component, inject, signal } from '@angular/core';
import { TableService } from '../../../services/api/table/table.service';
import { AlertService } from '../../../services/alert/alert.service';
import { form, maxLength, minLength, required, FormField } from '@angular/forms/signals';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';

@Component({
  selector: 'app-form-service-table',
  imports: [FormField],
  templateUrl: './form-service-table.component.html',
  styleUrl: './form-service-table.component.css',
})
export class FormServiceTableComponent {
  	tableService = inject(TableService);
	alertService = inject(AlertService);

	tableModel = signal({
		name: ''
	});

	tableForm = form(this.tableModel, (fieldPath) => {
		required(fieldPath.name, {message: 'Name is required'});
		minLength(fieldPath.name, 4, {message: 'Enter a valid name'});
		maxLength(fieldPath.name, 50, {message: 'Enter a valid name less than 50 characters'});
	});

	public onSubmit(event: Event): void {
		event.preventDefault();

		const { name } = this.tableModel();

		this.tableService.createTable(name).subscribe({
			next: (res) => {
				
				this.tableService.addTable(res.tables[0]);
				this.alertService.show(res.message, MessageTypesEnum.SUCCESS);

				this.tableModel.set({ name: ''});
			},

			error: (err) => {
				console.log("Ha ocurrido un error: ", err);
			}
		});
	}
}
