import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses';
import { LoginComponent } from './pages/login';
import { EditCourseComponent } from './pages/editcourse';
import { NoContentComponent } from './pages/no-content';

export const ROUTES: Routes = [
	{ path: '', redirectTo: 'courses', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
	{ path: '**', component: NoContentComponent }
];
