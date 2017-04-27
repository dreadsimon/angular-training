import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../entities';
import { CourseService } from '../../services';
import { LoaderService } from '../../services';
import { Md2Dialog } from 'md2';
import { SearchPipe } from './../../pipes';

@Component({
	selector: 'courses',
	styleUrls: ['./courses.styles.scss'],
	templateUrl: './courses.template.html'
})

export class CoursesComponent implements OnInit, OnDestroy {
	private course: Course;
	private courses: Course[];
	private coursesAll: Course[];
	private current: number;
	private pages: number;
	private currDate: Date;
	private fakeArray: Array<any>;
	private courseServiceSubscription: Subscription;
	private deleteId: number;

	constructor(private courseService: CourseService,
		private loaderService: LoaderService,
		private changeDetectorRef: ChangeDetectorRef,
		private searchPipe: SearchPipe
	) {
		this.currDate = new Date();
		this.courses = [];
		this.current = 0;
		this.pages = 0;
		this.fakeArray = [];
		this.coursesAll = [];
		this.course = new Course(null, null, null, null, null, null);
	}

	public ngOnInit() {
		this.loaderService.show();
		this.courseServiceSubscription = this.courseService.getList().subscribe((res) => {
			setTimeout(() => {
				this.courses = res.courses;
				this.pages = parseInt(res.pages);
				this.fakeArray = new Array(this.pages);
				this.current = parseInt(res.current);
				this.coursesAll = this.courses.slice(0);

				this.loaderService.hide();
			}, 1000);
		});
	}

	private handleDeleteId(id, dialog: Md2Dialog) {
		this.deleteId = id;
		dialog.open();
	}

	private handleEditId(id, dialog: Md2Dialog) {
		this.loaderService.show();
		this.courseServiceSubscription = this.courseService.getOne(id).subscribe((res: Course) => {
			setTimeout(() => {
				this.course = Object.assign({}, res);

				this.loaderService.hide();
			}, 1000);
		});
		dialog.open();
	}

	private handleNew(dialog: Md2Dialog) {
		dialog.open();
	}

	private handleDelete(dialog: any) {
		dialog.close();

		this.loaderService.show();
		setTimeout(() => {
			this.courseService.delete(this.deleteId).subscribe(res => {
				console.log(res);
			}, err => {
				console.error(err);
			});
			this.courseService.getList().subscribe((res) => {
				this.courses = res.courses;
				this.pages = parseInt(res.pages);
				this.fakeArray = new Array(this.pages);
				this.current = parseInt(res.current);
				this.coursesAll = this.courses.slice(0);
			});
			this.deleteId = 0;

			this.loaderService.hide();
		}, 5000);
	}

	private handleSave(dialog: any) {
		dialog.close();

		this.loaderService.show();
		setTimeout(() => {
			this.courseService.update(this.course).subscribe(res => {
				console.log(res);
			}, err => {
				console.error(err);
			});
			this.courseService.getList().subscribe((res) => {
				this.courses = res.courses;
				this.pages = parseInt(res.pages);
				this.fakeArray = new Array(this.pages);
				this.current = parseInt(res.current);
				this.coursesAll = this.courses.slice(0);
			});
			this.course = new Course(null, null, null, null, null, null);

			this.loaderService.hide();
		}, 5000);
	}

	private handleSearch(phrase: string) {
		console.log(phrase);
		this.courseService.getList(phrase).subscribe((res) => {
			this.courses = res.courses;
			this.pages = parseInt(res.pages);
			this.fakeArray = new Array(this.pages);
			this.current = parseInt(res.current);
		});
	}

	private changePagination(i: number) {
		this.courseService.getList('', i, 10).subscribe((res) => {
			this.courses = res.courses;
			this.pages = parseInt(res.pages);
			this.fakeArray = new Array(this.pages);
			this.current = parseInt(res.current);
		});
	}

	private close(dialog: any) {
		dialog.close();
		this.course = new Course(null, null, null, null, null, null);
		this.deleteId = 0;
	}

	public ngOnDestroy() {
		this.courseServiceSubscription.unsubscribe();
	}
}
