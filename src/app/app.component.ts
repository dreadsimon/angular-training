/*
 * Angular 2 decorators and services
 */
import {
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [
		'./styles/vendors.scss',
		'./styles/index.scss',
		'./app.styles.scss'
	],
	templateUrl: './app.template.html'
})
export class AppComponent implements OnInit {

	constructor() {
	}

	public ngOnInit() {
	}

}
