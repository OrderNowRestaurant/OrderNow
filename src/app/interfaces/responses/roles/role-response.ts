import { RoleInterface } from "../../role/role-interface";
import { BaseResponseInterface } from "../base-response";

export interface RoleResponse extends BaseResponseInterface {
    roleList: RoleInterface[];
}
