import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../services'

@NgModule({
	declarations: [LoginComponent],
	imports: [RouterModule, CommonModule],
	exports: [LoginComponent],
	providers: [AuthService]
})
export class LoginModule {
	constructor() {
	}
}
