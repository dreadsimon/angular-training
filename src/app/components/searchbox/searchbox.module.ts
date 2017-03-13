import { NgModule } from '@angular/core';
import { SearchboxComponent } from './searchbox.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [SearchboxComponent],
	imports: [
		RouterModule,
		FormsModule
	],
	exports: [SearchboxComponent]
})
export class SearchboxModule {
	constructor() {
	}
}
