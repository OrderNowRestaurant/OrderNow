import { Component, inject, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/api/user/user.service';

@Component({
  selector: 'app-user-table',
  imports: [],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent {
	userService = inject(UserService);

	@Output() editRequested = new EventEmitter<any>();

	ngOnInit(): void {
		this.loadUsers();
	}

	public loadUsers() {
		this.userService.getUsers().subscribe({
			next: (res) => {
				if (res.userList != null && res.userList.length != 0) {
					this.userService.setUserList(res.userList);
					console.log(res);
				}
			},
			error: () => {

			}
		});
	}

	public onDeleteUser(username: string) {
		this.userService.deleteUser(username).subscribe({
			next: () => {
				const updated = this.userService.userList().filter(u => u.username !== username);

				this.userService.setUserList(updated);
			},
			error: () => {

			}
		});
	}

	public onEditUser(user: any) {
		this.editRequested.emit(user);
	}
}
