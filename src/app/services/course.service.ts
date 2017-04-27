import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { Course } from '../entities';
import coursesJSON from '../data/courses';
import { apiUrl } from './../data/config';

@Injectable()
export class CourseService {
    private url = apiUrl;

    constructor(private http: Http) {
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
                const courses = data.courses;

                courses.map(course => {
                    return new Course(
                        course.id,
                        course.name,
                        course.description,
                        course.date,
                        course.duration,
                        course.isTopRated);
                });
                return {pages: data.pages, current: data.current, courses};

            });
    }

    public getOne(id: number): Observable<Course> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + '/courses/' + id, options)
            .map(res => {
                const course = res.json();
                return new Course(
                    course.id,
                    course.name,
                    course.description,
                    course.date,
                    course.duration,
                    course.isTopRated);
            });
    }

    public add(course: Course) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    }

    public update(course: Course): Observable<Response> {
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
                .map(res => res);
        } else {
            return this.http.post(this.url + '/courses', item, options)
                .map(res => res);
        }

    }

    public delete(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.url + '/courses/' + id, options)
            .map(res => res);
    }
}
