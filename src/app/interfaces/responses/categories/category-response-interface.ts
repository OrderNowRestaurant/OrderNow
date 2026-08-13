import { CategoryInterface } from "../../category/category-interface";
import { BaseResponseInterface } from "../base-response";

export interface CategoryResponseInterface extends BaseResponseInterface {
    categoryList: CategoryInterface[];
}
