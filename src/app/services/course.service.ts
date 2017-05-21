import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { Course } from '../entities';
import { apiUrl } from './../data/config';
import { Store } from '@ngrx/store';

import {GET_ALL, GET_ONE, ADD, UPDATE, DELETE} from '../stores/course.store';

@Injectable()
export class CourseService {
    private url = apiUrl;

    constructor(private http: Http, private store: Store<any>) {
    }

    public getList(search?: string, page?: number, step?: number) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        if (!!search) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('q', search);
            options.search = params;
        }
        if (!!page) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', ''+page);
            params.set('count', ''+step);
            options.search = params;
        }

        return this.http.get(this.url + '/courses', options)
            .map(res => {
                const data = res.json();
                let courses = data.courses;

                courses = courses.map(course => {
                    return new Course(
                        course.id,
                        course.name,
                        course.description,
                        course.date,
                        course.duration,
                        course.isTopRated,
                        course.authors);
                });
                return { type: GET_ALL, payload: {pages: data.pages, current: data.current, courses}};
            })
            .subscribe(action => this.store.dispatch(action));
    }

    public getOne(id: number) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + '/courses/' + id, options)
            .map(res => {
                const data = res.json();
                const course = new Course(
                    data.id,
                    data.name,
                    data.description,
                    data.date,
                    data.duration,
                    data.isTopRated,
                    data.authors
                );
                return {type: GET_ONE, payload: {course}};
            })
            .subscribe(action => this.store.dispatch(action));
    }

    public update(course: Course) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const item = {
            name: course.title,
            description: course.description,
            date: course.date,
            duration: course.duration,
            isTopRated: course.topRated
        };
        if (!!course.id) {
            return this.http.put(this.url + '/courses/' + course.id, item, options)
                .map(res => res)
                .map(payload => { return {type: UPDATE, payload: payload }})
                .subscribe(action => this.store.dispatch(action));
        } else {
            return this.http.post(this.url + '/courses', item, options)
                .map(res => res)
                .map(payload => { return {type: ADD, payload: payload }})
                .subscribe(action => this.store.dispatch(action));
        }

    }

    public delete(id: number) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.url + '/courses/' + id, options)
            .map(res => res)
            .map(payload => { return {type: DELETE, payload: payload }})
            .subscribe(action => this.store.dispatch(action));
    }
}
