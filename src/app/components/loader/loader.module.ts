import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [LoaderComponent],
	imports: [RouterModule, CommonModule],
	exports: [LoaderComponent]
})
export class LoginModule {
	constructor() {
	}
}
