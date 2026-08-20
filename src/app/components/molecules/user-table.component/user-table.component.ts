import { Component, inject, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/api/user/user.service';
import { AlertService } from '../../../services/alert/alert.service';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';
import { ErrorResponseInterface } from '../../../interfaces/responses/error-response';
import { AuthService } from '../../../services/api/auth/auth.service';

@Component({
  selector: 'app-user-table',
  imports: [],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent {
	userService = inject(UserService);
	alertService = inject(AlertService);
	authService = inject(AuthService);

	@Output() editRequested = new EventEmitter<any>();

	ngOnInit(): void {
		this.loadUsers();
	}

	public loadUsers() {
		this.userService.getUsers().subscribe({
			next: (res) => {
				if (res.userList != null && res.userList.length != 0) {
					this.userService.setUserList(res.userList);
				}
			},
			error: (err: ErrorResponseInterface) => {
				this.alertService.show(err.error.message, MessageTypesEnum.ERROR);
			}
		});
	}

	public onDeleteUser(username: string) {
		
		const current = this.authService.getUsername();
		if (current !== null && current === username) {
			this.alertService.show('No puedes eliminar tu propio usuario.', MessageTypesEnum.ERROR);
			return;
		}

		this.userService.deleteUser(username).subscribe({
			next: (res) => {
				const updated = this.userService.userList().filter(u => u.username !== username);

				this.userService.setUserList(updated);

				this.alertService.show(res.message, MessageTypesEnum.SUCCESS);
			},
			error: (err: ErrorResponseInterface) => {
				this.alertService.show(err.error.message, MessageTypesEnum.ERROR);
			}
		});
	}

	public onEditUser(user: any) {
		this.editRequested.emit(user);
	}
}
