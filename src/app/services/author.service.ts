import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { Author } from '../entities';
import { apiUrl } from './../data/config';
import { Store } from '@ngrx/store';

import { GET_ALL } from '../stores/author.store';
let HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class AuthorService {
    private url = apiUrl;

    constructor(private http: Http, private store: Store<any>) {
    }

    public getList() {
        let options = new RequestOptions(HEADER);

        return this.http.get(this.url + '/authors', options)
            .map(res => {
                const data = res.json();
                let authors = data.map(author => {
                    return new Author(
                        author.id,
                        author.firstName,
                        author.lastName
                    );
                });
                return { type: GET_ALL, payload: { authors } };
            })
            .subscribe(action => this.store.dispatch(action));
    }
}
