import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses';
import { NoContentComponent } from './pages/no-content';

export const ROUTES: Routes = [
	{ path: '', redirectTo: 'courses', pathMatch: 'full' },
	{ path: '**', component: NoContentComponent }
];