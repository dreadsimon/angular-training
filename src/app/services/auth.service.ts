import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities';
import { Router, RouterModule } from '@angular/router';

@Injectable()
export class AuthService {
    user: User;
    token: string;

    constructor() {
        this.user = new User(1, 'Szymon', 'Banas', 'simon', 'test', true);
        this.token = Math.random().toString(36);
    }

    public login (login: string, password: string) {
        console.log('aaaaaaaaaaaa', login, password, this.user);
        if (login === this.user.login && password === this.user.password) {
            console.log('logged in: ', login);
            localStorage.setItem('login', login);
            localStorage.setItem('token', this.token);
        }
    }

    public logout () {
        localStorage.removeItem('login');
        localStorage.removeItem('token');
    }

    public isAuthenticated () {
        if (localStorage.getItem('token') == this.token) {
            return true;
        };
        return false;
    }

    public getUserInfo () {
        return localStorage.getItem('login');
    }
}
