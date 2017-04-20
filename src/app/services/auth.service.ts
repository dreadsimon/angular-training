import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams, RequestMethod } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../entities';
import { Router, RouterModule } from '@angular/router';
import { apiUrl } from './../data/config';

@Injectable()
export class AuthService {
    private user: User;
    private token: string;
    private url: string;
    public auth: ReplaySubject<any>;
    constructor(private router: Router, private http: Http) {
        this.user = new User(0, null, null, null, null, null, true);
        this.token = Math.random().toString(36);
        this.auth = new ReplaySubject(25, 1000);
        this.url = apiUrl;
    }

    public login(login: string, password: string) {
        return this.http.get(this.url+'/users')
            .map(res => {
                return res.json().map(user => new User(
                    user.id,
                    user.name.first,
                    user.name.last,
                    user.login,
                    user.password,
                    user.fakeToken,
                    true
                ));
            })
            .subscribe(res => {
                res.forEach(user => {
                    if (login === user.login && password === user.password) {
                        console.log('logged in: ', login);
                        localStorage.setItem('login', login);
                        localStorage.setItem('token', user.token);
                        this.auth.next('login');

                        this.router.navigate(['courses']);
                    }
                })
            });

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
