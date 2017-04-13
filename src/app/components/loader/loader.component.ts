import { Component } from '@angular/core';
import { LoaderService } from './../../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'loader',
	templateUrl: 'loader.component.html',
	styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
    private show: boolean;
    private loaderServiceSubscription: Subscription;

	constructor(private loaderService: LoaderService) {
	}

	public ngOnInit() {
        this.loaderServiceSubscription = this.loaderService.visibility.subscribe((res: boolean) => {
            this.show = res;
        });
	}
}
