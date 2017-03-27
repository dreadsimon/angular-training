/*
 * Angular 2 decorators and services
 */
import {
	Component,
	OnInit,
	ViewEncapsulation,
	ChangeDetectionStrategy
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	styleUrls: [
		'./styles/vendors.scss',
		'./styles/index.scss',
		'./app.styles.scss'
	],
	templateUrl: './app.template.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

	constructor() {
	}

	public ngOnInit() {
	}

}
