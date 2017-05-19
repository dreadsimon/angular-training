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
	private user: Observable<any>;

	constructor(private authService: AuthService, private store: Store<any>) {
		this.user = store.select<any>('authStore');
		this.user.subscribe(data => {
			console.log('data', data);
            if (data) {
                this.login = 'aaa';
            }
        });
	}

	public ngOnInit() {
		this.authServiceSubscription = this.authService.getUserInfo();
	}

	private logout() {
		this.authService.logout();
	}

	private isAuthenticated() {
		return this.authService.isAuthenticated();
	}
}
