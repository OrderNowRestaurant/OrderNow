import { RestaurantInterface } from "../../restaurant/restaurant-interface";
import { TableInterface } from "../../table/table-interface";
import { BaseResponseInterface } from "../base-response";

export interface CreateTableReponseInterface extends BaseResponseInterface{
    table: TableInterface;
}
