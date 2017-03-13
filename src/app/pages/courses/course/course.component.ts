import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../entities';

@Component({
	selector: 'course',
	templateUrl: 'course.component.html',
	styleUrls: [
		'./course.component.scss',
		'../../../styles/vendors.scss',
		'../../../styles/index.scss',
		'../../../app.styles.scss'],
	providers: []
})
export class CourseComponent {
	@Input() public course: Course;
	@Output() public courseId = new EventEmitter();

	constructor() {
	}

	handleDelete() {
		this.courseId.emit(this.course.id);
		console.log('delete clicked');
	}
}
