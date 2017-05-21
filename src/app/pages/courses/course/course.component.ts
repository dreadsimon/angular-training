import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../entities';


@Component({
	selector: 'course',
	templateUrl: 'course.component.html',
	styleUrls: ['./course.component.scss']
})
export class CourseComponent {
	@Input() public course: Course;
	@Output() public onDelete = new EventEmitter<number>();
	@Output() public onEdit = new EventEmitter<number>();

	constructor() {
	}

	private handleDelete() {
		this.onDelete.emit(this.course.id);
	}

	private handleEdit() {
		this.onEdit.emit(this.course.id);
	}
}
