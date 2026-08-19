import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserFormComponent } from "../../molecules/user-form.component/user-form.component";

@Component({
  selector: 'app-create-user-dialog',
  imports: [UserFormComponent],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.css',
})
export class CreateUserDialogComponent {
  	@ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
	@ViewChild(UserFormComponent) userForm!: UserFormComponent;
	
	public open(mode?: 'create' | 'edit', dish?: any) {
		if (mode === 'edit' && dish) {
			this.userForm.setEditMode(dish);
		} else {
			this.userForm.clearEditMode?.();
		}
		
		this.dialog.nativeElement.showModal();
	}

	public close() {
		this.dialog.nativeElement.close();
	}
}
