import { Service, signal } from '@angular/core';
import { ServerApiService } from '../server/server-api.service';
import { DishResponseInterface } from '../../../interfaces/responses/dishes/dish-response-interface';
import { Observable } from 'rxjs';
import { DishInterface } from '../../../interfaces/dish/dish-interface';

@Service()
export class DishService extends ServerApiService {
    private _dishList = signal<DishInterface[]>([]);
    readonly dishList = this._dishList.asReadonly();


    public getDishes(): Observable<DishResponseInterface> {
        return this.get<DishResponseInterface>("/get");
    }

    public createDish(dish: DishInterface): Observable<DishResponseInterface> {
        return this.post<DishResponseInterface>("/create", {
            name: dish.name,
            description: dish.description,
            time: dish.time,
            price: dish.price,
            category: dish.category
        });
    }

     public setDishList(dishList: DishInterface[]) {
            this._dishList.set(dishList);
        }
    
        public addDish(newDish: DishInterface) {
            this._dishList.update((current) => [...current, newDish]);
        }
    
}
