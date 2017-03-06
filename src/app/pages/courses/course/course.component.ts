import { Component, ViewEncapsulation, Input } from '@angular/core';
import { CourseItem } from '../../../entities';

@Component({
	selector: 'course',
	templateUrl: 'course.component.html',
	styles: [require('./course.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class CourseComponent {
	@Input() public course: CourseItem;

	constructor() {
	}
}
