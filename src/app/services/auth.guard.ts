import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate {
    private auth: Observable<any>;
    private isAuthenticated: boolean;

    constructor(private authService: AuthService, private router: Router, private store: Store<any>) {
        this.auth = store.select<any>('authStore');
		this.auth.subscribe(data => {
			if (data && data.isAuthenticated !== undefined) {
                this.isAuthenticated = data.isAuthenticated;
            }
        });
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let isAuthenticated = this.authService.isAuthenticated();
        if (!this.isAuthenticated) {
            this.router.navigate(['login']);
        }
        return this.isAuthenticated;
    }
}
