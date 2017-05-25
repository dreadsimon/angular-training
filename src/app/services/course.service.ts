import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { Course } from '../entities';
import { apiUrl } from './../data/config';
import { Store } from '@ngrx/store';

import { GET_ALL, GET_ONE, ADD, UPDATE, DELETE } from '../stores/course.store';
let HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class CourseService {
    private url = apiUrl;

    constructor(private http: Http, private store: Store<any>) {
    }

    public getList(search?: string, page?: number, step?: number) {
        let options = new RequestOptions(HEADER);
        let params: URLSearchParams = new URLSearchParams();
        if (!!search) {
            params.set('q', search);
            options.search = params;
        }
        if (page > -1) {
            params.set('page', '' + page);
            params.set('count', '' + step);
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
                return { type: GET_ALL, payload: { pages: data.pages, current: data.current, courses } };
            })
            .subscribe(action => this.store.dispatch(action));
    }

    public getOne(id: number) {
        let options = new RequestOptions(HEADER);
        return this.http.get(this.url + '/courses/' + id, options)
            .map(res => {
                const data = res.json();
                const course = new Course(
                    data.id,
                    data.name,
                    data.description,
                    new Date(data.date),
                    data.duration,
                    data.isTopRated,
                    data.authors
                );
                return { type: GET_ONE, payload: { course } };
            })
            .subscribe(action => this.store.dispatch(action));
    }

    public update(course: Course) {
        let options = new RequestOptions(HEADER);
        const item = {
            name: course.title,
            description: course.description,
            date: new Date(course.date),
            duration: course.duration,
            isTopRated: course.topRated,
            authors: course.authors
        };
        if (!!course.id) {
            return this.http.put(this.url + '/courses/' + course.id, item, options)
                .map(res => res)
                .map(payload => { return { type: UPDATE, payload: payload } })
                .subscribe(action => this.store.dispatch(action));
        } else {
            return this.http.post(this.url + '/courses', item, options)
                .map(res => res)
                .map(payload => { return { type: ADD, payload: payload } })
                .subscribe(action => this.store.dispatch(action));
        }

    }

    public delete(id: number) {
        let options = new RequestOptions(HEADER);
        return this.http.delete(this.url + '/courses/' + id, options)
            .map(res => res)
            .map(payload => { return { type: DELETE, payload: payload } })
            .subscribe(action => this.store.dispatch(action));
    }
}
