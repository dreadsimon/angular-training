import { Component, forwardRef  } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, ControlValueAccessor,ValidationErrors } from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputDateComponent),
    multi: true
};

const CUSTOM_INPUT_CONTROL_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => InputDateComponent),
  multi: true,
};

@Component({
	selector: 'date',
	template: `
		<input [(ngModel)]="value"
				class="form-control input-date"
				(blur)="onBlur()">
	`,
	styleUrls: ['./inputdate.component.scss'],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALIDATOR]
})
export class InputDateComponent implements ControlValueAccessor, Validator {
	//The internal data model
    private innerValue: any = '';
    public acceptedFormat = 'DD/MM/YYYY';
    private _validationErrors: ValidationErrors;
    private _onChange: Function;
    private _onTouched: Function;
    private _onValidatorChange: Function;

    public validate(c: FormControl): ValidationErrors {
      return this._validationErrors;
    }

	//get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChange(v);
        }
    }

	onChange = (_) => {};
    onTouched = () => {};

    //Set touched on blur
    onBlur() {
        this.onTouched();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

}
