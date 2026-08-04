import { Service } from '@angular/core';
import { ServerApiService } from '../server/server-api.service';
import { Observable } from 'rxjs';

import { RestaurantInterface } from '../../../interfaces/restaurant/restaurant-interface';
import { CreateRestaurantResponseInterface } from '../../../interfaces/responses/restaurants/create-restaurant-response-interface';
import { RestaurantResponseInterface } from '../../../interfaces/responses/restaurants/restaurant-response';
import { DeleteRestaurantResponseInterface } from '../../../interfaces/responses/restaurants/delete-restaurant-response';

@Service()
export class RestaurantService extends ServerApiService {

    /**
     * Creates a new restaurant with the given name.
     * @param restaurant 
     * @returns 
     */
    public createRestaurant(restaurant: RestaurantInterface): Observable<CreateRestaurantResponseInterface> {
        return this.post<CreateRestaurantResponseInterface>("restaurant/create", {
            name: restaurant.name
        });
    }

    public getRestaurantByUser(): Observable<RestaurantResponseInterface> {
        return this.get<RestaurantResponseInterface>("restaurant/find");
    }

    public deleteRestaurant(): Observable<DeleteRestaurantResponseInterface> {
        return this.delete<DeleteRestaurantResponseInterface>("restaurant/delete");
    }
}
