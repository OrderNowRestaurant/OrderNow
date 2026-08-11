import { Component } from '@angular/core';
import { DishListComponent } from "../../components/molecules/dish-list.component/dish-list.component";

@Component({
  selector: 'app-dishes.component',
  imports: [DishListComponent],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.css',
})
export class DishesComponent {}
