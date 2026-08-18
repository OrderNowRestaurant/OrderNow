import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page.component/auth-page.component';
import { HomeComponent } from './pages/home.component/home.component';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public-guard';
import { ManagementComponent } from './pages/management.component/management.component';
import { restaurantResolver } from './resolvers/restaurant.resolver';
import { DishesComponent } from './pages/dishes.component/dishes.component';
import { MainLayoutComponent } from './components/layouts/main-layout.component/main-layout.component';
import { WorkersComponent } from './pages/workers.component/workers.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthPageComponent,
        canMatch: [publicGuard]
    },
    {
        path: '',
        component: MainLayoutComponent,
        canMatch: [authGuard],
        children: [
            {
                path: 'home',
                component: HomeComponent,
                resolve: {
                    restaurantLoaded: restaurantResolver
                }
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'management',
                component: ManagementComponent
            },
            {
                path: 'dishes',
                component: DishesComponent
            },
            {
                path: 'workers',
                component: WorkersComponent
            }
            
        ]
    }
];
