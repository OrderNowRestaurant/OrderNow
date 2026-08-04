import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/api/auth/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
	const authService = inject(AuthService);

	const requestWithToken = req.clone({
		headers: req.headers.set('Authorization', 'Bearer ' + authService.getToken())
	})
	
	return next(requestWithToken);
};
