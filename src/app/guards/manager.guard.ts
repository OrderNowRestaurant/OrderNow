import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/api/auth/auth.service';

export const managerGuard: CanMatchFn = (route, segments) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.getRoleName() === 'MANAGER' ? true : router.createUrlTree(['/home']);
};
