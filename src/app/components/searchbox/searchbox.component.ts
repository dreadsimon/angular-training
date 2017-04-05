import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'searchbox',
	templateUrl: 'searchbox.component.html',
	styleUrls: ['./searchbox.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchboxComponent {
	private searchText: string;
	@Output() public onSearch = new EventEmitter<string>();

	constructor() {
		this.searchText = '';
	}

	private handleSearch() {
		this.onSearch.emit(this.searchText);
  	}
}
