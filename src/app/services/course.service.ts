import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../entities';
import coursesJSON from '../data/courses';


@Injectable()
export class CourseService {
    courses: Course[] = coursesJSON;
    
    constructor() {

    }

    public getList (): Observable<Course[]> {
        return Observable.of<Course[]>(this.courses);
    }

    public getOne (id: number) {
        return this.courses.filter((course) => course.id === id);
    }

    public add (course: Course) {
        this.courses.push(course);
    }

    public delete (id: number) {
        this.courses = this.courses.filter((course) => course.id === id);
    }
}
