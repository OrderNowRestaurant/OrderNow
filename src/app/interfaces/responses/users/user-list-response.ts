import { UserInterface } from "../../user/user-interface";
import { BaseResponseInterface } from "../base-response";

export interface UserListResponse extends BaseResponseInterface {
    userList: UserInterface[];
}
