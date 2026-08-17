import { Service, signal } from '@angular/core';
import { ServerApiService } from '../server/server-api.service';
import { DishResponseInterface } from '../../../interfaces/responses/dishes/dish-response-interface';
import { Observable } from 'rxjs';
import { DishInterface } from '../../../interfaces/dish/dish-interface';
import { CreateDishInterface } from '../../../interfaces/dish/create-dish-interface';

@Service()
export class DishService extends ServerApiService {
    private _dishList = signal<DishInterface[]>([]);
    readonly dishList = this._dishList.asReadonly();


    public getDishes(): Observable<DishResponseInterface> {
        return this.get<DishResponseInterface>("dish/get");
    }

    public createDish(dish: CreateDishInterface): Observable<DishResponseInterface> {
        return this.post<DishResponseInterface>("dish/create", {
            name: dish.name,
            description: dish.description,
            time: dish.time,
            price: dish.price,
            categoryName: dish.categoryName
        });
    }

    public editDish(dish: CreateDishInterface & { originalName?: string }): Observable<DishResponseInterface> {
        return this.put<DishResponseInterface>("dish/edit", {
            originalName: dish.originalName,
            name: dish.name,
            description: dish.description,
            time: dish.time,
            price: dish.price,
            categoryName: dish.categoryName
        });
    }

    public deleteDish(dishName: string): Observable<DishResponseInterface> {
        return this.post<DishResponseInterface>("dish/delete", {
            dishName: dishName
        });
    }

    public setDishList(dishList: DishInterface[]) {
        this._dishList.set(dishList);
    }

    public addDish(newDish: DishInterface) {
        this._dishList.update((current) => [...current, newDish]);
    }

    public updateDish(updatedDish: DishInterface, originalName?: string) {
        this._dishList.update((current) => current.map(d => d.name === (originalName ?? updatedDish.name) ? updatedDish : d));
    }
    
}