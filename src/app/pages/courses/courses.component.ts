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
	templateUrl: './courses.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursesComponent implements OnInit, OnDestroy {
	private courses: Course[];
	private currDate: Date;
	private courseServiceSubscription: Subscription;
	private deleteId: number;

	constructor(private courseService: CourseService,
		private loaderService: LoaderService,
		private changeDetectorRef: ChangeDetectorRef,
		private searchPipe: SearchPipe
	) {
		this.currDate = new Date();
		this.courses = [];
	}

	public ngOnInit() {
		console.log('Home page init');
		this.loaderService.show();
		this.courseServiceSubscription = this.courseService.getList().subscribe((res: Course[]) => {
			setTimeout(() => {
				this.courses = res;

				this.loaderService.hide();
				this.changeDetectorRef.markForCheck();
			}, 1000);
		});
	}

	private handleCourseId(id, dialog: Md2Dialog) {
		this.deleteId = id;
		dialog.open();
	}

	private handleDelete(dialog: any) {
		dialog.close();

		this.loaderService.show();
		setTimeout(() => {
			this.courseService.delete(this.deleteId);
			this.courseService.getList().subscribe((res: Course[]) => {
				this.courses = res;
			});
			this.deleteId = 0;

			this.loaderService.hide();
			this.changeDetectorRef.markForCheck();
		}, 5000);
	}

	private handleSearch(phrase: string) {
		console.log(phrase);
		this.courses = this.searchPipe.transform(this.courses, phrase);
	}

	private close(dialog: any) {
		dialog.close();
	}

	public ngOnDestroy() {
		this.courseServiceSubscription.unsubscribe();
	}
}
