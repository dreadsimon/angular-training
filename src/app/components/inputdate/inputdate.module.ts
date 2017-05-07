import { NgModule } from '@angular/core';
import { InputDateComponent } from './inputdate.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateValidator } from './../../validators/date.validator.directive';

@NgModule({
	declarations: [InputDateComponent, DateValidator],
	imports: [RouterModule, CommonModule],
	exports: [InputDateComponent]
})
export class InputDateModule {
	constructor() {
	}
}
