import { Component, Input } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';


@Component({
  selector: 'app-qr-code',
  imports: [QRCodeComponent],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css',
})
export class QrCodeComponent {
  	@Input() qrToken: string = "";
}
