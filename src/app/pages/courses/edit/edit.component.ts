import { FormGroup, NgForm } from "@angular/forms";
import { Component, ViewEncapsulation, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Course } from '../../../entities';
import { Author } from '../../../entities';

@Component({
	selector: 'edit',
	styleUrls: ['./edit.component.scss'],
	templateUrl: 'edit.component.html'
})

export class EditCourseComponent implements OnInit {
	@ViewChild('editform') public editform: NgForm;

	@Input() public course: Course;
	@Input() public authors: Author[];

	@Output() public isValid = new EventEmitter();

	constructor() {

	}

	public ngOnInit() {
		this.editform.statusChanges.subscribe((status) => {
			this.isValid.emit(status === 'VALID');
		});
	}
}
