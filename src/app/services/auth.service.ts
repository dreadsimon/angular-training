import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams, RequestMethod } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../entities';
import { Router, RouterModule } from '@angular/router';
import { apiUrl } from './../data/config';
import { Store } from '@ngrx/store';

import {LOGIN, LOGOUT, USER_INFO} from '../stores/auth.store';

let HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class AuthService {
    private user: User;
    private token: string;
    private url: string;
    public auth: ReplaySubject<any>;
    constructor(private router: Router, private http: Http, private store: Store<any>) {
        this.user = new User(0, null, null, null, null, null, true);
        this.auth = new ReplaySubject(25, 1000);
        this.url = apiUrl;
    }

    public login(login: string, password: string) {
        let options = new RequestOptions(HEADER);
        return this.http.post(this.url+'/auth/login', {"login": login, "password": password}, options)
            .map(res => res.json())
            .map(payload => {
                console.log(payload);
                let token = payload.token;
                localStorage.setItem('token', token);
                this.auth.next('login');
                return { type: LOGIN, payload }
            })
            .subscribe(action => this.store.dispatch(action));
    }

    public logout() {
        this.store.dispatch({type: LOGOUT});
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
        HEADER.headers.set('Authorization', token);
        let options = new RequestOptions(HEADER);

        return this.http.post(this.url+'/auth/userinfo', {}, options)
            .map(res => res.json())
            .map(payload => {
                this.auth.next('getUser');
                const user = new User(
                    payload.id,
                    payload.name.first,
                    payload.name.last,
                    payload.login,
                    payload.password,
                    payload.fakeToken,
                    true
                );
                return { type: USER_INFO, user }
            })
            .subscribe(action => this.store.dispatch(action));
    }
}
