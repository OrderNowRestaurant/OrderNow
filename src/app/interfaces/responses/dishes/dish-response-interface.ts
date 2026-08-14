import { DishInterface } from "../../dish/dish-interface";
import { BaseResponseInterface } from "../base-response";

export interface DishResponseInterface extends BaseResponseInterface {
    dishList: DishInterface[];
}