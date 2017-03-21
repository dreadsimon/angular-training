import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	private login: string;

	constructor(private authService: AuthService) {
		this.login = this.authService.getUserInfo();
	}

	private logout() {
		this.authService.logout();
	}

	private isAuthenticated() {
		return this.authService.isAuthenticated();
	}
}
