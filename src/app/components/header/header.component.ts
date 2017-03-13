import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'main-header',
	templateUrl: 'header.component.html',
	styleUrls: [
		'./header.component.scss',
		'../../styles/vendors.scss',
		'../../styles/index.scss',
		'../../app.styles.scss'
	],
	providers: []
})
export class HeaderComponent {
	constructor() {

	}
}
