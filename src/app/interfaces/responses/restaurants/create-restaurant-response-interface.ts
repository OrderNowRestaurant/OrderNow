import { RestaurantInterface } from "../../restaurant/restaurant-interface";
import { BaseResponseInterface } from "../base-response";

export interface CreateRestaurantResponseInterface extends BaseResponseInterface{
    restaurant: RestaurantInterface;
}
