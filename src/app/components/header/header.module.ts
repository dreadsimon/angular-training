import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { LogoModule } from '../logo';
import { LoginModule } from '../login';

@NgModule({
	declarations: [HeaderComponent],
	imports: [
		RouterModule,
		LogoModule,
		LoginModule
	],
	exports: [HeaderComponent]
})
export class HeaderModule {
	constructor() {
	}
}
