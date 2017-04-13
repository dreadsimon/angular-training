import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { AuthGuard } from './../../services/auth.guard';

// Route Configuration
const coursesRoutes: Routes = [
	{ path: 'courses', component: CoursesComponent, /*canActivate: [AuthGuard]*/ }
];

export const routes = RouterModule.forChild(coursesRoutes);
