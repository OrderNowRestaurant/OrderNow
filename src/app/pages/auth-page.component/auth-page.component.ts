import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthFormComponent } from "../../components/organisms/auth/auth-form.component/auth-form.component";

@Component({
  selector: 'app-auth-page.component',
  imports: [AuthFormComponent],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {
  private route = inject(ActivatedRoute);

  parameter: string | null = null;

  ngOnInit() {
    this.parameter = this.route.snapshot.queryParamMap.get('form');
  }
}
