import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../entities';
import coursesJSON from '../data/courses';

@Injectable()
export class CourseService {

    constructor() {
    }

    public getList (): Observable<Course[]> {
        return Observable.of<Course[]>(coursesJSON);
    }

    public getOne (id:number): <Course[]> {
        return Observable.of<Course[]>(coursesJSON);
    }

    public add (course: Course): Observable<Course[]> {
        return Observable.of<Course[]>(coursesJSON);
    }

    public delete (course: Course): Observable<Course[]> {
        return Observable.of<Course[]>(coursesJSON);
    }
}
