import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../entities';
import { Author } from '../../entities';
import { CourseService } from '../../services';
import { AuthorService } from '../../services';
import { LoaderService } from '../../services';
import { Md2Dialog } from 'md2';
import { SearchPipe } from './../../pipes';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'courses',
	styleUrls: ['./courses.styles.scss'],
	templateUrl: './courses.template.html'
})

export class CoursesComponent implements OnInit, OnDestroy {
	private course: Course;
	private courses: Course[];
	private coursesAll: Course[];
	private authors: Array<any>;
	private current: number;
	private pages: number;
	private currDate: Date;
	private editFormValid: boolean;
	private fakeArray: Array<any>;
	private deleteId: number;
	private coursesData: Observable<any>;
	private authorsData: Observable<any>;

	constructor(
		private courseService: CourseService,
		private authorService: AuthorService,
		private loaderService: LoaderService,
		private changeDetectorRef: ChangeDetectorRef,
		private searchPipe: SearchPipe,
		private store: Store<any>
	) {
		this.currDate = new Date();
		this.current = 0;
		this.pages = 1;
		this.fakeArray = [''];
		this.courses = [];
		this.authors = [{id: 1212121212, firstName: 'asas', lastName: 'null'}];
		this.coursesAll = [];
		this.course = new Course(null, null, null, null, null, null, []);
		this.coursesData = store.select<any>('courseStore');
		this.coursesData.subscribe(data => {
            if (data && data.courses) {
				setTimeout(() => {
					this.courses = data.courses;
					this.pages = parseInt(data.pages);
					if (this.pages > 0){
						this.fakeArray = Array(this.pages).fill('');
					}
					this.current = parseInt(data.current);
					this.coursesAll = this.courses.slice(0);

					this.loaderService.hide();
				}, 1000);
            }
			if(data && (data.isDeleted || data.isUpdated)) {
				console.log('deleted or updated');
				this.courseService.getList('', this.current, 10);
			}
			if (data && data.course) {
				setTimeout(() => {
					this.course = Object.assign({}, data.course);
					this.loaderService.hide();
				}, 1000);
			}
        });
		this.authorsData = store.select<any>('authorStore');
		this.authorsData.subscribe(data => {
			if (data && data.authors) {
				setTimeout(() => {
					this.authors = data.authors;
				}, 1000);
            }
		});
	}

	public ngOnInit() {
		this.loaderService.show();
		// get first portion of courses
		this.courseService.getList('', this.current, 10);
		this.authorService.getList();
	}

	private handleDeleteId(id, dialog: Md2Dialog) {
		this.deleteId = id;
		dialog.open();
	}

	private handleEditValidation(valid: boolean) {
		this.editFormValid = valid;
	}

	private handleEditId(id, dialog: Md2Dialog) {
		this.loaderService.show();
		this.courseService.getOne(id);
		dialog.open();
	}

	private handleNew(dialog: Md2Dialog) {
		this.course = new Course(null, null, null, null, null, null, []);
		dialog.open();
	}

	private handleDelete(dialog: any) {
		dialog.close();

		this.loaderService.show();
		setTimeout(() => {
			this.courseService.delete(this.deleteId);
			this.deleteId = 0;

			this.loaderService.hide();
		}, 5000);
	}

	private handleSave(dialog: any) {
		dialog.close();

		this.loaderService.show();
		setTimeout(() => {
			this.courseService.update(this.course);

			this.course = new Course(null, null, null, null, null, null, []);

			this.loaderService.hide();
		}, 5000);
	}

	private handleSearch(phrase: string) {
		this.courseService.getList(phrase, this.current, 10);
		// should be without coursesAll, check
	}

	private changePagination(i: number) {
		this.courseService.getList('', i, 10);
		// should be without coursesAll, check
	}

	private close(dialog: any) {
		dialog.close();
		this.course = new Course(null, null, null, null, null, null, []);
		this.deleteId = 0;
	}

	public ngOnDestroy() {
	}
}
