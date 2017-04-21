import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services';
import { User } from '../../entities';
import { LoaderService } from '../../services';
import { Router, RouterModule } from '@angular/router';

@Component({
	selector: 'login',
	providers: [],
	styleUrls: [
		'./login.styles.scss',
		'../../styles/vendors.scss',
		'../../styles/index.scss',
		'../../app.styles.scss'
	],
	templateUrl: './login.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit, OnDestroy {
	private currDate: Date;
	private isLoading: boolean = false;
	private credentials: {login: string, password: string};

	constructor(private router: Router, private authService: AuthService, private loaderService: LoaderService) {
		this.credentials = Object.assign({}, {login: '', password: ''});
	}

	private handleLogin() {
		if (!!this.credentials.login && !!this.credentials.password) {this.loaderService.show()};
		this.authService.login(this.credentials.login, this.credentials.password).subscribe(res => {
			this.router.navigate(['courses']);
		});
		// this.authService.auth.subscribe(
		// 	val => {
		// 		console.log('auth replay subject', val);
		// 	},
		// 	err => {
		// 		console.log('error', err)
		// 	},
		// 	() => {
		// 		console.log('completed');
		// 	}
		// );

	}
	public ngOnInit() {
		console.log('Home page init');

	}

	public ngOnDestroy() {
	}
}
