import { inject, Injectable, signal } from '@angular/core';
import { RestaurantInterface } from '../../interfaces/restaurant/restaurant-interface';
import { RestaurantService } from '../api/restaurant/resturant.service';
import { firstValueFrom } from 'rxjs';

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

    async loadRestaurant(): Promise<boolean> {
        this._loading.set(true);

        try {
            const res = await firstValueFrom(this.restaurantService.getRestaurantByUser());
            this._restaurant.set(res.restaurant);
            this._loading.set(false);
            return true;
        } catch (err) {
            console.error('Error al obtener restaurante:', err);
            this._restaurant.set(null);
            this._loading.set(false);
            return false;
        }
    }

    updateLocalRestaurant(updated: RestaurantInterface): void {
        this._restaurant.set(updated);
    }

    deleteLocalRestaurant(): void {
        this._restaurant.set(null);
    }
}