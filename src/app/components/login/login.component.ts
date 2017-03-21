import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: [
		'./login.component.scss',
		'../../styles/vendors.scss',
		'../../styles/index.scss',
		'../../app.styles.scss'
	],
	providers: []
})
export class LoginComponent {
	public login: string;

	constructor(private authService: AuthService) {
		this.login = this.authService.getUserInfo();
	}

	logout() {
		this.authService.logout();
	}

	isAuthenticated() {
		return this.authService.isAuthenticated();
	}
}
