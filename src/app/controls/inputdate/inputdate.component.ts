import { Component, forwardRef, Input  } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, ControlValueAccessor } from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputDateComponent),
    multi: true
};

const CUSTOM_INPUT_CONTROL_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => InputDateComponent),
  multi: true,
};

@Component({
	selector: 'date',
	template:
    `<div>
    		<input [value]="viewValue"
                    [placeholder]="acceptedFormat"
    				class="form-control input-date"
    				(blur)="onChange($event)">
            <span class="status-message error-message" *ngIf="control?.errors?.dateFormatError">Invalid format</span>
    </div>`,
	styleUrls: ['./inputdate.component.scss'],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALIDATOR]
})
export class InputDateComponent implements ControlValueAccessor, Validator {
     @Input() public control: FormControl;
    private viewValue: string = '';
    public modelValue: string;
    private acceptedFormat: '00/00/0000'
    private _onChange: Function;
    private _onTouched: Function;
    private propagateChange = (_: any) => { };
    private dateError: boolean;

    public validate(c: FormControl) {
        let DATE_REGEXP = new RegExp('^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$');
        console.log('validate', c.value, DATE_REGEXP.test(c.value));
        return (!this.dateError && DATE_REGEXP.test(c.value)) ? null : { dateFormatError: {valid: false} };
    }

    onTouched = () => {};

    //From ControlValueAccessor interface
    public writeValue(value: any) {
        if (value !== this.modelValue) {
            this.modelValue = value;
            this.viewValue = value;
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

    private onChange(event) {
        console.log('onChange', event.target.value);
        this.modelValue = event.target.value;
        this.propagateChange(this.modelValue);
    }
}
