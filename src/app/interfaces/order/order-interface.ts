import { DishInterface } from "../dish/dish-interface";

export interface OrderInterface {
    idOrder: number;
    dishList: DishInterface[];
    serviceTableName: string;
}