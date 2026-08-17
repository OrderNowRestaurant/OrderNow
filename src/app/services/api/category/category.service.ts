import { Service, signal } from '@angular/core';
import { ServerApiService } from '../server/server-api.service';
import { CategoryResponseInterface } from '../../../interfaces/responses/categories/category-response-interface';
import { Observable } from 'rxjs';
import { CategoryInterface } from '../../../interfaces/category/category-interface';

@Service()
export class CategoryService extends ServerApiService {
    private _categoryList = signal<CategoryInterface[]>([]);
    readonly categoryList = this._categoryList.asReadonly();
    
    public getCategories(): Observable<CategoryResponseInterface> {
        return this.get<CategoryResponseInterface>("category/get");
    }

    public getOwnCategories(): Observable<CategoryResponseInterface> {
        return this.get<CategoryResponseInterface>("category/own/get");
    }


    public createCategory(categoryName: string): Observable<CategoryResponseInterface> {
        return this.post<CategoryResponseInterface>("category/create", {
            name: categoryName
        });
    }

    public deleteCategory(categoryName: string) {
        return this.post<any>("category/delete", {
            name: categoryName
        });
    }

    public setCategoryList(categoryList: CategoryInterface[]) {
        this._categoryList.set(categoryList);
    }

    public addCategory(newCategory: CategoryInterface) {
        this._categoryList.update((current) => [...(current ?? []), newCategory]);
    }

    
}
