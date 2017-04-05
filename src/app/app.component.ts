/*
 * Angular 2 decorators and services
 */
import {
	Component,
	OnInit,
	ViewEncapsulation,
	NgZone
} from '@angular/core';
import { Subscription } from 'rxjs';
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
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
	private ngZoneSubscription: Subscription;
	private loaderSubscription: Subscription;
	private isLoading: boolean;

	constructor(private ngZone: NgZone) {
	}

	public ngOnInit() {
		// this.ngZoneSubscription = this.ngZone.onUnstable.subscribe((res: any) => {
		// 	console.time('ngZone onStable');
		// });
		// this.ngZoneSubscription = this.ngZone.onStable.subscribe((res: any) => {
		// 	console.timeEnd('ngZone onStable');
		// });
	}

}
