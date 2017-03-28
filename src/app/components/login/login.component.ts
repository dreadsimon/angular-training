import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
	public login: string;
	private authServiceSubscription: Subscription;

	constructor(private authService: AuthService) {
	}

	public ngOnInit() {
		this.authServiceSubscription = this.authService.getUserInfo().subscribe((res: string) => {
			this.login = res;
		});
	}

	private logout() {
		this.authService.logout();
	}

	private isAuthenticated() {
		console.log('login comp isAUth', this.authService.isAuthenticated());
		return this.authService.isAuthenticated();
	}
}
