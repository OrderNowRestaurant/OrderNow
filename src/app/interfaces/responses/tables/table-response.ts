import { TableInterface } from "../../table/table-interface";
import { BaseResponseInterface } from "../base-response";

export interface TableResponse extends BaseResponseInterface {
    tables: TableInterface[];
}