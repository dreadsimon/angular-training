import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../entities';
import { CourseService } from '../../services';

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
	private isLoading: boolean = false;
	private courseServiceSubscription: Subscription;

	constructor(private courseService: CourseService) {
		console.log('Home page constructor');
		this.currDate = new Date();
		this.courses = [];
	}

	public ngOnInit() {
		console.log('Home page init');
		this.isLoading = true;
		this.courseServiceSubscription = this.courseService.getList().subscribe((res: Course[]) => {
			console.log('SUBSCP');
			this.courses = res;
			this.isLoading = false;
		});
	}

	handleCourseId(id) {
		console.log('output id', id);
	}

	public ngOnDestroy() {
		this.courseServiceSubscription.unsubscribe();
	}
}
