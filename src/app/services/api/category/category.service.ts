import { Service } from '@angular/core';
import { ServerApiService } from '../server/server-api.service';
import { CategoryResponseInterface } from '../../../interfaces/responses/categories/category-response-interface';
import { Observable } from 'rxjs';

@Service()
export class CategoryService extends ServerApiService {
    public getCategories(): Observable<CategoryResponseInterface> {
        return this.get<CategoryResponseInterface>("category/get");
    }
}
