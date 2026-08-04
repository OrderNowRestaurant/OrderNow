import { RestaurantInterface } from "../../restaurant/restaurant-interface";
import { BaseResponseInterface } from "../base-response";

export interface RestaurantResponseInterface extends BaseResponseInterface{
    restaurant: RestaurantInterface;
}
