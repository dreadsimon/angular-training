// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './editcourse.routes';

// custom components
import { EditCourseComponent } from './editcourse.component';
import { SearchboxModule } from '../../components';
import { Md2Module }  from 'md2';
import { FreshDirective } from './../../directives/fresh.directive';
import { CourseService } from './../../services/course.service';

// custom pipes
import { DurationPipe } from './../../pipes';
import { OrderByPipe } from './../../pipes';

@NgModule({
	declarations: [
		EditCourseComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		SearchboxModule,
        Md2Module.forRoot()
	],
	providers: [CourseService]
})
export class EditCourseModule {
	constructor() {
	}
}
