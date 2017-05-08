import { Component, forwardRef  } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputDateComponent),
    multi: true
};

@Component({
	selector: 'date',
	template: `
		<input [(ngModel)]="value"
				class="form-control input-date"
				(blur)="onBlur()">
	`,
	styleUrls: ['./inputdate.component.scss'],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputDateComponent implements ControlValueAccessor {
	//The internal data model
    private innerValue: any = '';


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
