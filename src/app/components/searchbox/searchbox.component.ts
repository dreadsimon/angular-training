import { Component } from '@angular/core';

@Component({
	selector: 'searchbox',
	templateUrl: 'searchbox.component.html',
	styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent {
	private searchText: string;

	constructor() {
		this.searchText = '';
	}

	private handleSearch() {
	    console.log('find', this.searchText);
  	}
}
