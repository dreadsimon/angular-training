//Import from '@angular/core' the module Pipe and PipeTransform
import { Pipe, PipeTransform } from '@angular/core';

//Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
	name: 'search'
})
export class SearchPipe implements PipeTransform {

	transform(array: any[], title: string) {
		if (!array.length || title === '') {
			return array;
		}
		return array.filter((item) => {
			return item.title.toLowerCase().search(title.toLowerCase()) > -1;
		});
	}
}
