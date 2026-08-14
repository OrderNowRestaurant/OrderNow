import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page.component/auth-page.component';
import { HomeComponent } from './pages/home.component/home.component';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public-guard';
import { ManagementComponent } from './pages/management.component/management.component';
import { restaurantResolver } from './resolvers/restaurant.resolver';
import { DishesComponent } from './pages/dishes.component/dishes.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthPageComponent,
        canMatch: [publicGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canMatch: [authGuard],
        resolve: {
            restaurantLoaded: restaurantResolver
        }
    },
    {
        path: 'management',
        component: ManagementComponent,
        canMatch: [authGuard]
    },
    {
        path: 'dishes',
        component: DishesComponent,
        canMatch: [authGuard]
    }
];
