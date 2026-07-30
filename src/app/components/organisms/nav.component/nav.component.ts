import { Component, inject } from '@angular/core';
import { NavLinkComponent } from "../../atoms/nav-link.component/nav-link.component";
import { AuthService } from '../../../services/api/auth/auth.service';

@Component({
  selector: 'app-nav-component',
  imports: [ NavLinkComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
	authService = inject(AuthService);
}
