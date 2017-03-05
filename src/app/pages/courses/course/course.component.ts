import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Course } from '../../../core/entities';
import { CourseStatusClasses } from '../../../core/enums';

@Component({
	selector: 'course',
	templateUrl: 'course.component.html',
	styles: [require('./course.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class CourseComponent {
	@Input() public course: Course;

	constructor() {
	}

	public calculateStatusClass(status): string {
		return CourseStatusClasses[status];
	}
}
