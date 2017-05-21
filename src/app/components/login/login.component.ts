import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../entities';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	public login: string;
	private authServiceSubscription: Subscription;
	private auth: Observable<any>;

	constructor(private authService: AuthService, private store: Store<any>) {
		this.auth = store.select<any>('authStore');
		this.auth.subscribe(data => {
            if (data && data.user) {
                this.login = data.user.login;
            }
			if (data && data.isAuthenticated !== undefined) {
                this.isAuthenticated = data.isAuthenticated;
            }
        });
	}

	public ngOnInit() {
		this.authService.getUserInfo();
	}

	private logout() {
		this.authService.logout();
	}

	private isAuthenticated() {
		this.authService.isAuthenticated();
	}
}
