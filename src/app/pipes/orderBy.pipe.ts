//Import from '@angular/core' the module Pipe and PipeTransform
import { Pipe, PipeTransform } from '@angular/core';

//Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
	name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

	transform(array) {
		array.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
		return array;
	}
}
