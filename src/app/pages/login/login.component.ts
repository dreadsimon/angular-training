import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services';
import { User } from '../../entities'

@Component({
	selector: 'login',
	providers: [],
	styleUrls: [
		'./login.styles.scss',
		'../../styles/vendors.scss',
		'../../styles/index.scss',
		'../../app.styles.scss'
	],
	templateUrl: './login.template.html'
})

export class LoginComponent implements OnInit, OnDestroy {
	private user: User;
	private currDate: Date;
	private isLoading: boolean = false;

	constructor() {
	}

	public ngOnInit() {
		console.log('Home page init');
		this.isLoading = true;
	}

	public ngOnDestroy() {
	}
}
