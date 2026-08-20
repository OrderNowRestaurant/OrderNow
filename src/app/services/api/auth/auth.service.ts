import { inject, Service } from '@angular/core';
import { ServerApiService } from '../server/server-api.service';
import { UserInterface } from '../../../interfaces/user/user-interface';
import { Observable } from 'rxjs';
import { AuthResponseInterface } from '../../../interfaces/responses/auth-response-interface';
import { BaseResponseInterface } from '../../../interfaces/responses/base-response';
import { Router } from '@angular/router';

@Service()
export class AuthService extends ServerApiService {
    router = inject(Router);

    isLoggedIn(): boolean {
        const token = localStorage.getItem('token');

        return !!token;
    }

    setToken(tokenValue: string): void {
        localStorage.setItem("token", tokenValue);
    }

    getToken(): string  {
        return localStorage.getItem("token")??'';
    }

    setUsername(username: string): void {
        localStorage.setItem("username", username);
    }

    getUsername(): string | null {
        return localStorage.getItem("username");
    }

    setRoleName(roleName: string): void {
        localStorage.setItem("roleName", roleName);
    }

    getRoleName(): string | null {
        return localStorage.getItem("roleName");
    }

    logout(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("roleName");

        this.router.navigate(['/auth'])
    }

    public register(user: UserInterface): Observable<BaseResponseInterface> {
        return this.post("user/register", {
            username: user.username,
            password: user.password
        });
    }

    public login(user: UserInterface): Observable<AuthResponseInterface> {
        return this.post<AuthResponseInterface>("user/login", {
            username: user.username,
            password: user.password
        });
    }
}
