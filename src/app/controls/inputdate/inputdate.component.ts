import { Component, forwardRef, Input  } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';

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
    `<input [value]="viewValue"
                [placeholder]="acceptedFormat"
				class="form-control input-date"
				(blur)="onChange($event)">`,
	styleUrls: ['./inputdate.component.scss'],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALIDATOR]
})
export class InputDateComponent implements ControlValueAccessor, Validator {
     @Input() public control: FormControl;
    private viewValue: string;
    private modelValue: string;
    private acceptedFormat: 'DD/MM/YYYY'
    private _onChange: Function;
    private _onTouched: Function;
    private propagateChange = (_: any) => { };
    private dateError: boolean;

    public validate(c: FormControl) {
        const DATE_REGEXP = new RegExp(/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/);
        return (!this.dateError && DATE_REGEXP.test(c.value)) ? null : { dateFormatError: {valid: false} };
    }

    onTouched = () => {};

    //From ControlValueAccessor interface
    public writeValue(value: any) {
        this.modelValue = value;
        this.viewValue = value ? moment(value).format(this.acceptedFormat) : null;
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
        this.modelValue = event.target.value;
        this.dateError = false;
        this.propagateChange(this.modelValue);
    }
}
