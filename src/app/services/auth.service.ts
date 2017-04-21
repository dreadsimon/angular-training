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
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url+'/auth/login', {"login": login, "password": password}, options)
            .map(res => {
                let token = res.json().token;
                localStorage.setItem('token', token);
                this.auth.next('login');

                console.log('logged in: ', login);
                this.router.navigate(['courses']);
            });

    }

    public logout() {
        localStorage.removeItem('token');
        this.auth.next('logout');
        this.router.navigate(['login']);
    }

    public isAuthenticated() {
        if (!!localStorage.getItem('token')) {
            this.auth.next(true);
            return true;
        };
        this.auth.next(false);
        return false;
    }

    public getUserInfo() {
        const token =  localStorage.getItem('token');
        console.log(token);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.set('Authorization', token);
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url+'/auth/userinfo', {}, options)
            .map(res => {
                const user = res.json();
                console.log('response', user);
                return new User(
                    user.id,
                    user.name.first,
                    user.name.last,
                    user.login,
                    user.password,
                    user.fakeToken,
                    true
                );
            });
    }
}
