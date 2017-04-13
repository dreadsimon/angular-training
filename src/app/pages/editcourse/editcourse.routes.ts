import { Routes, RouterModule } from '@angular/router';
import { EditCourseComponent } from './editcourse.component';
import { AuthGuard } from './../../services/auth.guard';

// Route Configuration
const editCourseRoutes: Routes = [
	{ path: 'edit', component: EditCourseComponent, /*canActivate: [AuthGuard]*/ }
];

export const routes = RouterModule.forChild(editCourseRoutes);
