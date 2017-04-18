import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../entities';
import coursesJSON from '../data/courses';


@Injectable()
export class CourseService {
    private courses: Course[];
    private course: Course;

    constructor() {
         this.fillCourses();
    }

    private fillCourses() {
       if (!this.courses) {
           this.courses = [];
       }

       (<any[]>coursesJSON).forEach(a => {
           this.courses.push(Object.assign(new Course(null, null, null, null, null, null), a));
       });

       //last 2 weeks only
       this.courses = this.courses.filter(item => {
           return new Date(item.date) > new Date(+new Date - 12096e5);
       });
   }

    public getList (): Observable<Course[]> {
        return Observable.of<Course[]>(this.courses);
    }

    public getOne (id: number) {
        this.course = this.courses.find((course) => course.id === id);
        return Observable.of<Course>(this.course);
    }

    public add (course: Course) {
        this.courses.push(course);
        return true;
    }

    public update (course: Course) {
        let pos;
        if (!!course.id) {
            this.courses.forEach(item => {
                if (course.id === item.id) {
                    pos = this.courses.indexOf(item);
                }
            });
            this.courses[pos] = Object.assign({}, this.courses[pos], course);
        } else {
            course.id = Math.floor((Math.random() * 100) + 1);
            this.add(course);
        }
        return true;
    }

    public delete (id: number) {
        this.courses = this.courses.filter((course) => course.id !== id);
        return true;
    }
}
