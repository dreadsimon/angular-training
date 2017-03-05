import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./courses.styles.scss')],
	template: require('./courses.template.html')
})
export class CoursesComponent implements OnInit, OnDestroy {

	constructor() {
		console.log('Home page constructor');
	}

	public ngOnInit() {
		console.log('Home page init');
	}

	public ngOnDestroy() {
	}
}
