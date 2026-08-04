import { RestaurantInterface } from "../restaurant/restaurant-interface";

export interface TableInterface {
    name: string;
    restaurant: RestaurantInterface;
}