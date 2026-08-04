import { RestaurantInterface } from "../../restaurant/restaurant-interface";
import { BaseResponseInterface } from "../base-response";

export interface DeleteRestaurantResponseInterface extends BaseResponseInterface{
    restaurant: RestaurantInterface;
}
