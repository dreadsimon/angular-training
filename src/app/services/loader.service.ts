import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoaderService {
    public visibility = new EventEmitter<boolean>();

    constructor() {
    }

    public show() {
        this.visibility.emit(true);
    }

    public hide() {
         this.visibility.emit(false);
    }
}
