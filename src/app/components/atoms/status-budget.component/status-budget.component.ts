import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-budget',
  imports: [],
  templateUrl: './status-budget.component.html',
  styleUrl: './status-budget.component.css',
})
export class StatusBudgetComponent {
	@Input() status: string = "";
}
