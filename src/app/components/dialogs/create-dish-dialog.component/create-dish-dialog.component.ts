import { Component, ElementRef, ViewChild } from '@angular/core';
import { DishFormComponent } from "../../molecules/dish-form.component/dish-form.component";

@Component({
  selector: 'app-create-dish-dialog',
  imports: [DishFormComponent],
  templateUrl: './create-dish-dialog.component.html',
  styleUrl: './create-dish-dialog.component.css',
})
export class CreateDishDialogComponent {
  	@ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
	
	public open() {
		this.dialog.nativeElement.showModal();
	}

	public close() {
		this.dialog.nativeElement.close();
	}
}
