import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageDialogComponent } from './components/molecules/message-dialog.component/message-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, MessageDialogComponent]
})
export class App {
  protected readonly title = signal('OrderNow');
}
