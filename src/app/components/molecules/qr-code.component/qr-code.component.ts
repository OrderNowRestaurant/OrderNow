import { Component, Input } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { environment } from '../../../../environments/environment.development';


@Component({
  selector: 'app-qr-code',
  imports: [QRCodeComponent],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css',
})
export class QrCodeComponent {
    @Input() qrToken: string = "";

    get qrUrl(): string {
      const url = new URL(environment.FRONTEND_URL);
      url.searchParams.set('token', this.qrToken);
      return url.toString();
    }
}
