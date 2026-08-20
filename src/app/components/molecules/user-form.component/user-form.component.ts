import { Component, inject, Output, signal, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../../services/api/user/user.service';
import { AlertService } from '../../../services/alert/alert.service';
import { RoleInterface } from '../../../interfaces/role/role-interface';
import { form, required, FormField } from '@angular/forms/signals';
import { RoleService } from '../../../services/api/role/role.service';
import { AuthService } from '../../../services/api/auth/auth.service';
import { MessageTypesEnum } from '../../../enums/MessageTypes.enum';
import { SectionTitleComponent } from "../../atoms/section-title.component/section-title.component";
import { UserInterface } from '../../../interfaces/user/user-interface';
import { ErrorResponseInterface } from '../../../interfaces/responses/error-response';

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
	authService = inject(AuthService);

	@ViewChild('roleSelect') roleSelect?: ElementRef<HTMLSelectElement>;

	@Output() editSuccess = new EventEmitter<void>();

	public editMode = signal(false);
	private originalUsername: string | null = null;
	private originalRoleName: string | null = null;

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

	public setEditMode(user: UserInterface) {
		this.editMode.set(true);
		this.originalUsername = user.username;

		this.userModel.set({
			username: user.username ?? '',
			password: user.password ?? '',
			roleName: user.roleName ?? ''
		});
		this.originalRoleName = user.roleName ?? '';

		// Disable role select if editing self (manipulate DOM to avoid NG8022)
		Promise.resolve().then(() => {
			if (this.roleSelect) {
				this.roleSelect.nativeElement.disabled = (this.authService.getUsername() === user.username);
			}
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

		Promise.resolve().then(() => {
			if (this.roleSelect) {
				this.roleSelect.nativeElement.disabled = false;
			}
		});
	}

	public isEditingSelf(): boolean {
		const current = this.authService.getUsername();
		return this.editMode() && current !== null && this.originalUsername === current;
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

			error: (err: ErrorResponseInterface) => {
				this.alertService.show(err.error.message, MessageTypesEnum.ERROR);
			}
		});
	}

	private editDish() {
		const { username, password, roleName } = this.userModel();

		const originalUsername = this.originalUsername ?? undefined

		// Prevent changing own role locally
		const current = this.authService.getUsername();
		if (current !== null && current === this.originalUsername && roleName !== (this.originalRoleName ?? '')) {
			this.alertService.show('No puedes cambiar tu propio rol.', MessageTypesEnum.ERROR);
			return;
		}

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

			error: (err: ErrorResponseInterface) => {
				this.alertService.show(err.error.message, MessageTypesEnum.ERROR);
			}
		});
	}
}
