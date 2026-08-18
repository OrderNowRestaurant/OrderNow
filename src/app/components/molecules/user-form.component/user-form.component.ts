import { Component, inject, Output, signal, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/api/user/user.service';
import { AlertService } from '../../../services/alert/alert.service';
import { RoleInterface } from '../../../interfaces/role/role-interface';
import { form, required, FormField } from '@angular/forms/signals';
import { RoleService } from '../../../services/api/role/role.service';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';
import { SectionTitleComponent } from "../../atoms/section-title.component/section-title.component";

@Component({
  selector: 'app-user-form',
  imports: [FormField, SectionTitleComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  	userService = inject(UserService);
	roleService = inject(RoleService);
	alertService = inject(AlertService);

	@Output() editSuccess = new EventEmitter<void>();

	public editMode = signal(false);
	private originalUsername: string | null = null;

	public roleList: RoleInterface[] = [];

	ngOnInit() {
		this.roleService.getRoles().subscribe({
			next: (res) => {
				this.roleList = res.roleList;
			},

			error: () => {

			}
		});
	}

	userModel = signal({
		username: '',
		password: '',
		roleName: '',
	});

	userForm = form(this.userModel, (fieldPath) => {
		required(fieldPath.username, {message: 'Username is required'});
		required(fieldPath.password, {message: 'Password is required'});
		required(fieldPath.roleName, {message: 'Role is required'});
	});

	public onSubmit(event: Event): void {
		event.preventDefault();

		if (this.editMode()) {
			this.editDish();
		} else {
			this.createDish();
		}
	}

	public setEditMode(user: any) {
		this.editMode.set(true);
		this.originalUsername = user.username;

		this.userModel.set({
			username: user.username ?? '',
			password: user.password ?? '',
			roleName: user.role ?? {}
		});
	}

	public clearEditMode() {
		this.editMode.set(false);
		this.originalUsername = null;
		this.userModel.set({ 
			username: '',
			password: '',
			roleName: ''
		});
	}

	private createDish() {
		const { username, password, roleName} = this.userModel();

		this.userService.createUser({
			username,
			password,
			roleName
		}).subscribe({
			next: (res) => {
				this.userService.addUser(res.user);
				this.alertService.show(res.message, MessageTypesEnum.SUCCESS);

				this.userModel.set({ 
					username: '',
					password: '',
					roleName: ''
				});
			},

			error: (err) => {
				console.log("Ha ocurrido un error: ", err);
			}
		});
	}

	private editDish() {
		const { username, password, roleName } = this.userModel();

		const originalUsername = this.originalUsername ?? undefined

		this.userService.editUser({
			username,
			password,
			roleName,
			originalUsername
		}).subscribe({
			next: (res) => {
				this.userService.updateUser(res.user, this.originalUsername ?? undefined);
				this.alertService.show(res.message, MessageTypesEnum.SUCCESS);

				this.clearEditMode();
				this.editSuccess.emit();
			},

			error: (err) => {
				console.log("Ha ocurrido un error: ", err);
			}
		});
	}
}
