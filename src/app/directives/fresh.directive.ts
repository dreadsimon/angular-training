import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[fresh]'
})

export class FreshDirective {
    private currentDate: Date = new Date();
    private daysAgoDate: Date = new Date();
    private createdDateObj: Date;
    private colorFresh: String = '#8dd660';
    private colorHot: String = '#d68f60';
    @Input() public createdDate: Date;

    constructor(private el: ElementRef) {

    }

    public ngOnInit() {
        this.createdDateObj = new Date(this.createdDate);
        this.daysAgoDate.setDate(this.currentDate.getDate() - 14);

        if ((this.createdDateObj < this.currentDate) && (this.createdDateObj >= this.daysAgoDate)) {
            this.el.nativeElement.style.borderColor = this.colorFresh;
        }
        if (this.createdDateObj > this.currentDate) {
            this.el.nativeElement.style.borderColor = this.colorHot;
        }

    }


}
