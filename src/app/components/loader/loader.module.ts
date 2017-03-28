import { NgModule } from '@angular/core';
import { LoginComponent } from './loader.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [LoaderComponent],
	imports: [RouterModule, CommonModule],
	exports: [LoginComponent]
})
export class LoginModule {
	constructor() {
	}
}
