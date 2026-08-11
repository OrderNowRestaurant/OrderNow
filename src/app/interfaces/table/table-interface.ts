import { RestaurantInterface } from "../restaurant/restaurant-interface";

export interface TableInterface {
    name: string;
    qrToken: string;
    restaurant: RestaurantInterface;
    status: string;
}