import { NgModule } from '@angular/core';
import { SearchboxComponent } from './searchbox.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [SearchboxComponent],
	imports: [
		FormsModule
	],
	exports: [SearchboxComponent]
})
export class SearchboxModule {
	constructor() {
	}
}
