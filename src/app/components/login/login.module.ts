import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [LoginComponent],
	imports: [RouterModule, CommonModule],
	exports: [LoginComponent]
})
export class LoginModule {
	constructor() {
	}
}
