import { UserInterface } from "../../user/user-interface";
import { BaseResponseInterface } from "../base-response";

export interface UserResponse extends BaseResponseInterface {
    user: UserInterface;
}
