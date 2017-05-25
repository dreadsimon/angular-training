import { Component, forwardRef, Input  } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, ControlValueAccessor } from '@angular/forms';
import { Course } from '../../entities';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckAuthorsComponent),
    multi: true
};

const CUSTOM_INPUT_CONTROL_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CheckAuthorsComponent),
  multi: true,
};

@Component({
	selector: 'checkauthors',
	template:
    `<div>
        <div *ngFor="let author of allAuthors">
            <label class="custom-control custom-checkbox" (for)="author.id">
              <input type="checkbox" class="custom-control-input"
              (name)="author.id"
              (id)="author.id"
              [checked]="isChecked(author.id)"
              (change)="onChange($event, author.id)"
              >
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description">{{author.firstName}} {{author.lastName}}</span>
            </label>
        </div>
    </div>`,
	styleUrls: ['./checkauthors.component.scss'],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALIDATOR]
})
export class CheckAuthorsComponent implements ControlValueAccessor, Validator {
    @Input() public control: FormControl;
    @Input() public allAuthors: Array<any>;
    @Input() public selectedAuthors: Array<any>;

    private modelValue: Array<{id: number, firstName: string, lastName: string, selected?: boolean}>;
    private viewValue: Array<{id: number, firstName: string, lastName: string}>;
    private propagateChange = (_: any) => { };
    private onTouched = () => {};
    private dateError: boolean;


    public validate(c: FormControl) {
        console.log('validate', c.value);
        const validateList = c.value && c.value.length;
        //check if at least one is selected
        return (validateList) ? null : { authorSelected: {valid: false} };
    }


    //From ControlValueAccessor interface
    public writeValue(value: any) {
        console.log('write value ', value);
        if (value !== undefined) {
            this.selectedAuthors = value;
        }
    }

    //From ControlValueAccessor interface
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    //From ControlValueAccessor interface
    public registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    public onBlur() {
        this.onTouched();
    }

    public isChecked(id) {
        return this.selectedAuthors && this.selectedAuthors.find(i => i ===id);
    }
    public onChange(event, id) {
        console.log(this.selectedAuthors, event.target.checked, id, this.allAuthors.find(author => author.id === id));
        //map selected to object
        if (event.target.checked) {
            this.selectedAuthors.push(id);
            console.log(this.selectedAuthors);
        } else {
            this.selectedAuthors = this.selectedAuthors.filter(authorId => authorId !== id);
            console.log('remove', this.selectedAuthors);
        }
        this.dateError = false;
        this.propagateChange(this.selectedAuthors);
    }
}
