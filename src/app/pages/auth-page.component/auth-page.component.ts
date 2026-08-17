import { Component, inject, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthFormComponent } from "../../components/organisms/auth/auth-form.component/auth-form.component";

@Component({
  selector: 'app-auth-page.component',
  imports: [AuthFormComponent],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent implements OnInit, OnDestroy {
	private route = inject(ActivatedRoute);
	private cd = inject(ChangeDetectorRef);
	private sub: Subscription | null = null;

	parameter: string | null = null;

	ngOnInit() {
		this.sub = this.route.queryParamMap.subscribe((params) => {
			this.parameter = params.get('form');

			try {
				this.cd.detectChanges();
			} catch (e) {
			}
		});
  	}

	ngOnDestroy() {
		this.sub?.unsubscribe();
	}
}
