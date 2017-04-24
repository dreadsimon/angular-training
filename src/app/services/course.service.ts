import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { Course } from '../entities';
import coursesJSON from '../data/courses';
import { apiUrl } from './../data/config';

@Injectable()
export class CourseService {
    private courses: Course[];
    private course: Course;
    private url: string;

    constructor(private http: Http) {
        this.url = apiUrl;
        this.courses = [];
        this.course = new Course(null, null, null, null, null, null);
    }

    private fillCourses() {
       if (!this.courses) {
           this.courses = [];
       }

    //    (<any[]>coursesJSON).forEach(a => {
    //        this.courses.push(Object.assign(new Course(null, null, null, null, null, null), a));
    //    });

       //last 2 weeks only
    //    this.courses = this.courses.filter(item => {
    //        return new Date(item.date) > new Date(+new Date - 12096e5);
    //    });
   }

    public getList () {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url+'/courses', options)
            .map(res => {
                const courses = res.json();
                return courses.map(course => {
                    return new Course(
                        course.id,
                        course.name,
                        course.description,
                        course.date,
                        course.duration,
                        course.isTopRated);
                });
            })
            .map(courses => {
                this.courses = courses;
                console.table('response', this.courses);
                return this.courses;
            });
    }

    public getOne (id: number) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url+'/courses/' + id, options)
            .map(res => {
                const course = res.json();
                return new Course(
                        course.id,
                        course.name,
                        course.description,
                        course.date,
                        course.duration,
                        course.isTopRated);
            })
            .map(course => this.course = course);
    }

    public add (course: Course) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    }

    public update (course: Course) {
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
            return this.http.put(this.url+'/courses/'+course.id, item, options)
                .map(res => res);
        } else {
            return this.http.post(this.url+'/courses', item, options)
                .map(res => res);
        }

    }

    public delete (id: number) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.url+'/courses/'+id, options)
            .map(res => res);
    }
}
