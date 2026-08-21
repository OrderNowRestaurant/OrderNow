import { DishInterface } from "../dish/dish-interface";
import { TableInterface } from "../table/table-interface";

export interface OrderInterface {
    dishList: DishInterface[];
    serviceTable: TableInterface;
}