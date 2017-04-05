//Import from '@angular/core' the module Pipe and PipeTransform
import { Pipe, PipeTransform } from '@angular/core';

//Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
	name: 'duration'
})
export class DurationPipe implements PipeTransform {
    private transformedDuration: string;
    private hours: number;

	transform(duration: number) {
        this.hours = Math.trunc(duration/60);

        this.transformedDuration = this.hours ? this.hours + 'h' + duration%60 + 'm' : duration%60 + 'm';
		return this.transformedDuration;
	}
}
