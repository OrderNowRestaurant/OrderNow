import { CategoryInterface } from "../category/category-interface";

export interface CreateDishInterface {
    name: string,
    description: string,
    time: number,
    price: number,
    category: CategoryInterface
}