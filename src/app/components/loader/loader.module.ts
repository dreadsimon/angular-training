import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderService } from './../../services';

@NgModule({
	declarations: [LoaderComponent],
	imports: [RouterModule, CommonModule],
	exports: [LoaderComponent],
	providers: [LoaderService]
})
export class LoaderModule {
	constructor() {
	}
}
