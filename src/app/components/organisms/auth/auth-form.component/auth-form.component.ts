import { Component, inject, input, signal } from '@angular/core';
import { AuthService } from '../../../../services/api/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { form, minLength, required, FormField } from '@angular/forms/signals';
import { AlertService } from '../../../../services/alert/alert.service';
import { MessageTypesEnum } from '../../../../enums/MessageTypes.enum';

@Component({
  selector: 'app-auth-form',
  imports: [FormField, RouterLink],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css',
})
export class AuthFormComponent {
    public formTitle = input.required<string>();
    public formFunction = input.required<string>();

    private alertService = inject(AlertService);
    private authService = inject(AuthService);
    private router = inject(Router);

    authModel = signal({
        username: '',
        password: ''
    });

    loginForm = form(this.authModel, (fieldPath) => {
        required(fieldPath.username, {message: 'Username is required'});
        minLength(fieldPath.username, 4, {message: 'Enter a valid username address'});

        required(fieldPath.password, {message: 'Password is required'});
        minLength(fieldPath.password, 8, {message: 'Password must be at least 8 characters'});
    });

    public onLogin(): void {
        const { username, password } = this.authModel();

        this.authService.login({ username, password }).subscribe({
            next: (res) => {
                this.authService.setToken(res.token);
                this.authService.setUsername(res.username);

                this.alertService.show(res.message, MessageTypesEnum.SUCCESS);

                this.router.navigate(['/home']);
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
                this.alertService.show(res.message, MessageTypesEnum.SUCCESS);

                this.router.navigate(['/auth'], {
                    queryParams: { form: 'login' }
                });         
            },
            error: (err) => {
                console.log("Error: ", err);
            }
        });
    }

    public getOppositeUrl(): string {
        return this.formFunction() === "login" ? "register" : "login";
    }

    public handleSubmit(event: Event): void {
        event.preventDefault();

        if (this.formFunction() === "login") {
            this.onLogin();
        } else {
            this.onRegister();
        }
    }
}