import { Component, ViewEncapsulation, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Course } from '../../../entities';
import { Author } from '../../../entities';

@Component({
	selector: 'edit',
	styleUrls: ['./edit.component.scss'],
	templateUrl: 'edit.component.html'
})

export class EditCourseComponent {
	@Input() public course: Course;
	@Input() public authors: Author[];
	@Output() public formValid = new EventEmitter<Boolean>();

	constructor() {

	}
	public ngOnInit() {
	}

	private handleChange(valid) {
		this.formValid.emit(valid);
	}
}
