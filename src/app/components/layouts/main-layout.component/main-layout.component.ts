import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../organisms/nav.component/nav.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  imports: [NavComponent, RouterOutlet]
})
export class MainLayoutComponent {}
