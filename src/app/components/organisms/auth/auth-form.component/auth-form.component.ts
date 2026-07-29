import { Component, inject, input, Input, signal } from '@angular/core';
import { AuthService } from '../../../../services/api/auth/auth.service';
import { Router } from '@angular/router';
import { form, minLength, required, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-auth-form',
  imports: [FormField],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css',
})
export class AuthFormComponent {
  public formTitle = input.required<string>();
  public formFunction = input.required<string>();

  authService = inject(AuthService);
	router = inject(Router);

	authModel = signal({
		username: '',
		password: ''
	});

	loginForm = form(this.authModel, (fieldPath) => {
		required(fieldPath.username, {message: 'Username is required'});
		minLength(fieldPath.username, 4, {message: 'Enter a valid username address'});

		required(fieldPath.password, {message: 'Password is required'});
		minLength(fieldPath.password, 4, {message: 'Password must be at least 8 characters'});
	});

	public onLogin(): void {
		const { username, password } = this.authModel();

		this.authService.login({ username, password }).subscribe({
			next: (res) => {
				this.authService.setToken(res.token);
				this.authService.setUsername(res.username);

				this.router.navigateByUrl("home");
			},
			error: (err) => {
				console.log("Error: ", err);	
			}
		});
	}

  public onRegister(): void {
		const { username, password } = this.authModel();

		this.authService.register({ username, password }).subscribe({
			next: (res) => {
				this.router.navigateByUrl("/home");
			},
			error: (err) => {
				console.log("Error: ", err);
			}
		});
	}

	public getOppositeUrl(): string {
		return this.formFunction() == "login" ? "register" : "login";
	}

	public handleSubmit(event: Event): void {
		event.preventDefault();

		if(this.formFunction() == "login") {
			this.onLogin();
		} else {
			this.onRegister();
		}
	}
}
