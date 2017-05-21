import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
	NgModule,
	ApplicationRef
} from '@angular/core';
import {
	removeNgStyles,
	createNewHosts,
} from '@angularclass/hmr';
import {
	RouterModule,
	PreloadAllModules
} from '@angular/router';

import { StoreModule } from '@ngrx/store';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { NoContentComponent } from './pages/no-content';

// Components
import { HeaderModule, FooterModule, LogoModule, LoaderModule } from './components';

// Pages
import { CoursesModule } from './pages/courses';
import { LoginModule } from './pages/login';

// Services
import { AuthService } from './services';
import { AuthGuard } from './services/auth.guard';
import { CourseService } from './services';
import { AuthorService } from './services';

// Stores
import { authStore } from './stores/auth.store';
import { courseStore } from './stores/course.store';
import { authorStore } from './stores/author.store';


// Application wide providers
const APP_PROVIDERS = [
	AuthService,
	AuthGuard,
	CourseService,
	AuthorService
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		NoContentComponent
	],
	imports: [ // import Angular's modules
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
		HeaderModule,
		FooterModule,
		LogoModule,
		CoursesModule,
		LoginModule,
		LoaderModule,
		StoreModule.provideStore({ authStore, courseStore, authorStore }),
	],
	providers: [ // expose our Services and Providers into Angular's dependency injection
		ENV_PROVIDERS,
		APP_PROVIDERS
	]
})
export class AppModule {

	constructor(public appRef: ApplicationRef) {
	}

	public hmrOnInit(store: any) {
		if (!store || !store.state) { return; }
		this.appRef.tick();
		delete store.state;
	}

	public hmrOnDestroy(store: any) {
		const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
		// recreate elements
		store.disposeOldHosts = createNewHosts(cmpLocation);
		// remove styles
		removeNgStyles();
	}

	public hmrAfterDestroy(store: any) {
		// display new elements
		store.disposeOldHosts();
		delete store.disposeOldHosts;
	}

}
