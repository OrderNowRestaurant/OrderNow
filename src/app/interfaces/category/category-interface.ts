import { RestaurantInterface } from "../restaurant/restaurant-interface";

export interface CategoryInterface {
    name: string,
    restaurant: RestaurantInterface
}