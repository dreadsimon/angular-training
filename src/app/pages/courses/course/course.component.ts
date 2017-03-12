import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Course } from '../../../entities';

@Component({
	selector: 'course',
	templateUrl: 'course.component.html',
	styleUrls: ['./course.component.scss'],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class CourseComponent {
	@Input() public course: Course;

	constructor() {
	}
}
