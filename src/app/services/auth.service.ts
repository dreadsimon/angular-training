import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../entities';
import { Router, RouterModule } from '@angular/router';

@Injectable()
export class AuthService {
    private user: User;
    private token: string;
    public auth: ReplaySubject<any>;
    constructor(private router: Router) {
        this.user = new User(1, 'Szymon', 'Banas', 'simon', 'test', true);
        this.token = Math.random().toString(36);
        this.auth = new ReplaySubject(25, 1000);
    }

    public login(login: string, password: string) {
        if (login === this.user.login && password === this.user.password) {
            console.log('logged in: ', login);
            localStorage.setItem('login', login);
            localStorage.setItem('token', this.token);
            this.auth.next('login');

            this.router.navigate(['courses']);
        }
    }

    public logout() {
        localStorage.removeItem('login');
        localStorage.removeItem('token');
        this.auth.next('logout');
        this.router.navigate(['login']);
    }

    public isAuthenticated() {
        if (localStorage.getItem('token') == this.token) {
            this.auth.next(true);
            return true;
        };
        this.auth.next(false);
        return false;
    }

    public getUserInfo(): Observable<String> {
        this.auth.next(localStorage.getItem('login'));
        return Observable.of<String>(localStorage.getItem('login'));
    }
}
