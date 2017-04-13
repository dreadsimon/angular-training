import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../../entities';
import { CourseService } from '../../services';
import { LoaderService } from '../../services';
import { Md2Dialog } from 'md2';
import { SearchPipe } from './../../pipes';

@Component({
	selector: 'editcourse',
	styleUrls: ['./editcourse.styles.scss'],
	templateUrl: './editcourse.template.html'
})

export class EditCourseComponent implements OnInit, OnDestroy {
	private course: Course;
	private courseServiceSubscription: Subscription;

	constructor(private courseService: CourseService,
		private loaderService: LoaderService,
		private router: Router
	) {
		this.course = new Course(null, null, null, null, null, null);
	}

	public ngOnInit() {
		this.loaderService.show();
		this.courseServiceSubscription = this.courseService.getOne(33).subscribe((res: Course) => {
			setTimeout(() => {
				this.course = res;
				this.loaderService.hide();
			}, 1000);
		});
	}

	private cancel() {
		this.router.navigate(['courses']);
	}

	private save() {
		console.log('save');
	}

	public ngOnDestroy() {
		this.courseServiceSubscription.unsubscribe();
	}
}
