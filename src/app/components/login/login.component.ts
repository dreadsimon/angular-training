import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../entities';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	public login: string;
	private authServiceSubscription: Subscription;

	constructor(private authService: AuthService) {
	}

	public ngOnInit() {
		this.authServiceSubscription = this.authService.getUserInfo().subscribe((res) => {
			this.login = res.login;
		});
	}

	private logout() {
		this.authService.logout();
	}

	private isAuthenticated() {
		return this.authService.isAuthenticated();
	}
}
