import { Component, ViewChild } from '@angular/core';
import { SectionTitleComponent } from "../../components/atoms/section-title.component/section-title.component";
import { CreateUserDialogComponent } from '../../components/dialogs/create-user-dialog.component/create-user-dialog.component';

@Component({
  selector: 'app-workers',
  imports: [SectionTitleComponent, CreateUserDialogComponent],
  templateUrl: './workers.component.html',
  styleUrl: './workers.component.css',
})
export class WorkersComponent {
  	@ViewChild(CreateUserDialogComponent) userDialog!: CreateUserDialogComponent;

	public openUserDialog() {
		this.userDialog.open("create"); 
	}

	public openUserDialogForEdit(user: any) {
		this.userDialog.open("edit", user);
	}
}
