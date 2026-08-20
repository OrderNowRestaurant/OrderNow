import { BaseResponseInterface } from "./base-response";

export interface AuthResponseInterface extends BaseResponseInterface {
    username: string;
    token: string;
    roleName?: string;
}
