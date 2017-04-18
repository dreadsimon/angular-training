import { Component, ViewEncapsulation, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Course } from '../../../entities';

@Component({
	selector: 'edit',
	styleUrls: ['./edit.component.scss'],
	templateUrl: 'edit.component.html'
})

export class EditCourseComponent {
	@Input() public course: Course;
	@Output() public onDelete = new EventEmitter<number>();

	constructor() {}
}
