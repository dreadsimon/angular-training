import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../entities';
@Component({
	selector: 'courses',
	templateUrl: './courses.template.html',
	styleUrls: ['./courses.styles.scss']
})

export class CoursesComponent implements OnInit, OnDestroy {
	private courses: Course[] = [];
	private currDate = new Date();

	constructor() {
		console.log('Home page constructor');
	}

	public ngOnInit() {
		console.log('Home page init');
		this.courses = [
			{
				id: 1,
				title: 'Video course 1',
				description: 'Lorem ipsum',
				date: this.currDate,
				duration: 1
			},
			{
				id: 2,
				title: 'Video course 2',
				description: 'Lorem ipsum',
				date: this.currDate,
				duration: 2.5
			},
			{
				id: 3,
				title: 'Video course 3',
				description: 'Lorem ipsum',
				date: this.currDate,
				duration: 0.5
			},
			{
				id: 4,
				title: 'Video course 4',
				description: 'Lorem ipsum',
				date: this.currDate,
				duration: 2
			}
		];
	}

	private handleCourseId(id) {
		console.log('output id', id);
	}

	public ngOnDestroy() {
	}
}
