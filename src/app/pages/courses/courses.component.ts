import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../entities';
@Component({
	selector: 'courses',
	providers: [],
	styleUrls: [
		'./courses.styles.scss',
		'../../styles/vendors.scss',
		'../../styles/index.scss',
		'../../app.styles.scss'
	],
	templateUrl: './courses.template.html'
})

export class CoursesComponent implements OnInit, OnDestroy {
	private courses: Course[];
	private currDate: Date;

	constructor() {
		console.log('Home page constructor');
		this.currDate = new Date();
		this.courses = [];
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

	handleCourseId(id) {
		console.log('output id', id);
	}

	public ngOnDestroy() {
	}
}
