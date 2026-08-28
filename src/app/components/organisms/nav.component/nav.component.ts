import { Component, inject } from '@angular/core';
import { NavLinkComponent } from "../../atoms/nav-link.component/nav-link.component";
import { AuthService } from '../../../services/api/auth/auth.service';
import { RestaurantInterface } from '../../../interfaces/restaurant/restaurant-interface';
import { RestaurantGlobalService } from '../../../services/global/restaurant-global.service';

@Component({
  selector: 'app-nav-component',
  imports: [ NavLinkComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
	authService = inject(AuthService);
	public menuOpen = false;

  	restaurantGlobalService = inject(RestaurantGlobalService);

	public toggleMenu(): void {
		this.menuOpen = !this.menuOpen;
	}

	public closeSession(): void {
		this.menuOpen = false;
		this.authService.logout();
	}
}
