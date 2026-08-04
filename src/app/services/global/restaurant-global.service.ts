import { inject, Injectable, signal } from '@angular/core';
import { RestaurantInterface } from '../../interfaces/restaurant/restaurant-interface';
import { RestaurantService } from '../api/restaurant/resturant.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantGlobalService {
    private restaurantService = inject(RestaurantService);

    private _restaurant = signal<RestaurantInterface | null>(null);
    private _loading = signal<boolean>(false);

    readonly restaurant = this._restaurant.asReadonly();
    readonly loading = this._loading.asReadonly();

    constructor() {
        this.loadRestaurant();
    }

    loadRestaurant(): void {
        this._loading.set(true);

        this.restaurantService.getRestaurantByUser().subscribe({
            next: (res) => {
                this._restaurant.set(res.restaurant);
                this._loading.set(false);
            },
            error: (err) => {
                console.error('Error al obtener restaurante:', err);
                this._loading.set(false);
            }
        });
    }

    updateLocalRestaurant(updated: RestaurantInterface): void {
        this._restaurant.set(updated);
    }

    deleteLocalRestaurant(): void {
        this._restaurant.set(null);
    }
}