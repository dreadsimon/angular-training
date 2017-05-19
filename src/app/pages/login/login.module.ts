// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './login.routes';

// ngrx
import { authStore } from './../../stores/auth.store';

// custom components
import { LoginComponent } from './login.component';

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule
	],
	providers: []
})
export class LoginModule {
	constructor() {
	}
}
