import { OrderInterface } from "../../order/order-interface";
import { BaseResponseInterface } from "../base-response";

export interface OrderResponseInterface extends BaseResponseInterface {
    orderList: OrderInterface[];
}