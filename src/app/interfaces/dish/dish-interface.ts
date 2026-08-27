import { RestaurantInterface } from "../restaurant/restaurant-interface";
import { CategoryInterface } from "../category/category-interface";

export interface DishInterface {
    name: string,
    description: string,
    time: number,
    price: number,
    restaurant: RestaurantInterface,
    category: CategoryInterface,
    quantity: number
}