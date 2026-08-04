import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/organisms/nav.component/nav.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, NavComponent]
})
export class App {
  protected readonly title = signal('OrderNow');
}
