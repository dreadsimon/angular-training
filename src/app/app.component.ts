/*
 * Angular 2 decorators and services
 */
import {
	Component,
	OnInit,
	ViewEncapsulation,
	ChangeDetectionStrategy,
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
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
	private ngZoneSubscription: Subscription;

	constructor(private ngZone: NgZone) {
	}

	public ngOnInit() {
		// this.ngZoneSubscription = this.ngZone.onUnstable.subscribe((res: any) => {
		// 	console.log('ngZone on Unstable', +new Date);
		// });
		// this.ngZoneSubscription = this.ngZone.onStable.subscribe((res: any) => {
		// 	console.log('ngZone onStable', +new Date);
		// });
	}

}
