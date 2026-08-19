import { Component } from '@angular/core';
import { ServiceTableListComponent } from '../../components/organisms/service-table-list.component/service-table-list.component';
import { SectionTitleComponent } from '../../components/atoms/section-title.component/section-title.component';

@Component({
  selector: 'app-service-table.component',
  imports: [ServiceTableListComponent, SectionTitleComponent],
  templateUrl: './service-table.component.html',
  styleUrl: './service-table.component.css',
})
export class ServiceTableComponent {
}
