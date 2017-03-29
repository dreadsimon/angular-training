import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../entities';
import { CourseService } from '../../services';
import { LoaderService } from '../../services';
import { Md2Dialog } from 'md2';

@Component({
	selector: 'courses',
	providers: [],
	styleUrls: [
		'./courses.styles.scss',
		'../../styles/vendors.scss',
		'../../styles/index.scss',
		'../../app.styles.scss'
	],
	templateUrl: './courses.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursesComponent implements OnInit, OnDestroy {
	private courses: Course[];
	private currDate: Date;
	private courseServiceSubscription: Subscription;
	private deleteId: number;

	constructor(private courseService: CourseService, private loaderService: LoaderService) {
		this.currDate = new Date();
		this.courses = [];
	}

	public ngOnInit() {
		console.log('Home page init');
		this.loaderService.show();
		this.courseServiceSubscription = this.courseService.getList().subscribe((res: Course[]) => {
			this.courses = res;
			setTimeout(() => {this.loaderService.hide()}, 5000);
		});
	}

	private handleCourseId(id, dialog: Md2Dialog) {
		this.deleteId = id;
		dialog.open();
	}

	private handleDelete(dialog: any) {
		this.courseService.delete(this.deleteId);
		this.courseService.getList().subscribe((res: Course[]) => {
			this.courses = res;
		});
		this.deleteId = 0;
		dialog.close();
	}

	private close(dialog: any) {
		dialog.close();
	}

	public ngOnDestroy() {
		this.courseServiceSubscription.unsubscribe();
	}
}
