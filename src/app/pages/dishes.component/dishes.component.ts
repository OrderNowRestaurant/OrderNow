import { Component, ViewChild } from '@angular/core';
import { DishListComponent } from "../../components/molecules/dish-list.component/dish-list.component";
import { DishFormComponent } from "../../components/molecules/dish-form.component/dish-form.component";
import { CreateDishDialogComponent } from "../../components/dialogs/create-dish-dialog.component/create-dish-dialog.component";
import { SectionTitleComponent } from "../../components/atoms/section-title.component/section-title.component";

@Component({
  selector: 'app-dishes.component',
  imports: [DishListComponent, CreateDishDialogComponent, SectionTitleComponent],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.css',
})
export class DishesComponent {
	
	@ViewChild(CreateDishDialogComponent) dishDialog!: CreateDishDialogComponent;

	public openDishDialog() {
		this.dishDialog.open("create"); 
	}

	public openDishDialogForEdit(dish: any) {
		this.dishDialog.open("edit", dish);
	}
}
