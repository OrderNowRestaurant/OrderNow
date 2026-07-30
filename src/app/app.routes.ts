import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page.component/auth-page.component';
import { HomeComponent } from './pages/home.component/home.component';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public-guard';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthPageComponent,
        canMatch: [publicGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canMatch: [authGuard]
    }
];
