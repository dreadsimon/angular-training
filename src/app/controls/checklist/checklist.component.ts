import { Component, forwardRef, Input  } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, ControlValueAccessor } from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckListComponent),
    multi: true
};

const CUSTOM_INPUT_CONTROL_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CheckListComponent),
  multi: true,
};

@Component({
	selector: 'checklist',
	template:
    `<div>
        <div *ngFor="let author of list">
            <label class="custom-control custom-checkbox" for="'inpauthor-'+author.id">
              <input type="checkbox" class="custom-control-input"
              name="'inpauthor-'+author.id"
              id="'inpauthor-'+author.id"
              [(ngModel)]="author.selected"
              (change)="onChange($event)"
              >
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description">{{author.firstName}} {{author.lastName}}</span>
            </label>
        </div>
    </div>`,
	styleUrls: ['./checklist.component.scss'],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALIDATOR]
})
export class CheckListComponent implements ControlValueAccessor, Validator {
     @Input() public list: Array<Object>;
     @Input() public control: FormControl;
    private viewValue: string;
    private modelValue: string;
    private _onChange: Function;
    private _onTouched: Function;
    private propagateChange = (_: any) => { };
    private dateError: boolean;

    public validate(c: FormControl) {
        return (!this.dateError && c.value.length) ? null : { authorsLength: {valid: false} };
    }

    onTouched = () => {};

    //From ControlValueAccessor interface
    public writeValue(value: any) {
        this.modelValue = value;
    }

    //From ControlValueAccessor interface
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    //From ControlValueAccessor interface
    public registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    private onChange(event) {
        console.log('event', event);
        this.modelValue = event.target.checked;
        this.dateError = false;
        this.propagateChange(this.modelValue);
    }
}
