import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoaderService } from './../../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'loader',
	templateUrl: 'loader.component.html',
	styleUrls: ['./loader.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
    private show: boolean;

	constructor() {
        this.show = true;
	}

	public ngOnInit() {

	}
}
