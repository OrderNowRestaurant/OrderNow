import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { TableInterface } from '../../interfaces/table/table-interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QrPdfService {
	public async downloadTablesQrCodes(tables: TableInterface[]): Promise<void> {
		const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
		const logo = await this.loadImageAsDataUrl('images/logo.png');
		const columns = 3;
		const rows = 3;
		const margin = 12;
		const cellWidth = (210 - margin * 2) / columns;
		const cellHeight = (297 - margin * 2) / rows;

		for (let index = 0; index < tables.length; index++) {
			if (index > 0 && index % (columns * rows) === 0) {
				pdf.addPage();
			}

			const position = index % (columns * rows);
			const column = position % columns;
			const row = Math.floor(position / columns);
			const x = margin + column * cellWidth;
			const y = margin + row * cellHeight;
			const qrUrl = new URL(environment.FRONTEND_URL);
			qrUrl.searchParams.set('token', tables[index].qrToken);
			const qrDataUrl = await QRCode.toDataURL(qrUrl.toString(), {
				width: 256,
				margin: 1,
				errorCorrectionLevel: 'M'
			});

			pdf.setDrawColor(220, 220, 220);
			pdf.roundedRect(x + 2, y + 2, cellWidth - 4, cellHeight - 4, 2, 2, 'S');
			if (logo) {
				pdf.addImage(logo, 'PNG', x + 7, y + 7, 8, 8);
			}
			pdf.setFontSize(11);
			pdf.setFont('helvetica', 'bold');
			pdf.text('OrderNow', x + (logo ? 18 : 7), y + 13);
			pdf.addImage(qrDataUrl, 'PNG', x + (cellWidth - 44) / 2, y + 20, 44, 44);
			pdf.setFontSize(10);
			pdf.text(this.truncateTableName(tables[index].name, 24), x + cellWidth / 2, y + 71, { align: 'center' });
		}

		pdf.save('ordernow-codigos-mesas.pdf');
	}

	private loadImageAsDataUrl(path: string): Promise<string> {
		return fetch(path)
			.then(response => response.blob())
			.then(blob => new Promise<string>((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result as string);
				reader.onerror = () => reject(reader.error);
				reader.readAsDataURL(blob);
			}))
			.catch(() => '');
	}

	private truncateTableName(name: string, maxLength: number): string {
		return name.length > maxLength ? `${name.slice(0, maxLength - 3)}...` : name;
	}
}