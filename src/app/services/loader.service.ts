import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoaderService {
    public visibility: Observable<Boolean>;

    constructor() {
        this.visibility = new Observable(observer => {
            observer.next(false);
            observer.complete();
        });
    }

    public show() {
        console.log('show loader');
        this.visibility = new Observable(observer => {
            observer.next(true);
            observer.complete();
        });
    }

    public hide() {
        console.log('hide loader');
        this.visibility = new Observable(observer => {
            observer.next(false);
            observer.complete();
        });
    }
}
