import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoaderService {
    private visibility: boolean;

    constructor() {
        this.visibility = false;
    }

    public show() {
        this.visibility = true;
    }

    public hide() {
        this.visibility = false;
    }

    public isVisible() {
        return Observable.of<Boolean>(this.visibility);
    }
}
