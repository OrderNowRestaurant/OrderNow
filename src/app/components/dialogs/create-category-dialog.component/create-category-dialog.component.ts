import { Component, ElementRef, ViewChild } from '@angular/core';
import { DishFormComponent } from '../../molecules/dish-form.component/dish-form.component';
import { CategoryFormComponent } from "../../molecules/category-form.component/category-form.component";

@Component({
  selector: 'app-create-category-dialog',
  imports: [CategoryFormComponent],
  templateUrl: './create-category-dialog.component.html',
  styleUrl: './create-category-dialog.component.css',
})
export class CreateCategoryDialogComponent {
 	@ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
	@ViewChild(DishFormComponent) dishForm!: DishFormComponent;

	public close() {
		this.dialog.nativeElement.close();
	}

	public open() {
		this.dialog.nativeElement.showModal();
	}
}
