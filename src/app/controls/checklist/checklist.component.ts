import { Component, forwardRef, Input  } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, ControlValueAccessor } from '@angular/forms';
import { Course } from '../../entities';

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
        <div *ngFor="let author of modelValue">
            <label class="custom-control custom-checkbox" (for)="author.id">
              <input type="checkbox" class="custom-control-input"
              (name)="author.id"
              (id)="author.id"
              [(ngModel)]="author.selected"
              (change)="onChange($event, author.id)"
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
    @Input() public control: FormControl;
    private modelValue: Array<{id: number, firstName: string, lastName: string, selected?: boolean}>;
    // @Input() private set list(list: Array<{id: number, firstName: string, lastName: string, selected?: boolean}>) {
    //     this.modelValue = list;
    // };
    // private get list() {
    //     return this.modelValue;
    // }

    private propagateChange = (_: any) => { };
    private onTouched = () => {};
    private dateError: boolean;


    public validate(c: FormControl) {
        const validateList = c.value && c.value.find(item => item.selected);
        //check if at least one is selected
        console.log('validate', c.value && c.value.find(item => item.selected) || !c.value);
        return (validateList) ? null : { authorSelected: {valid: false} };
    }


    //From ControlValueAccessor interface
    public writeValue(value: any) {
        console.log('writeValue', value);
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

    public onBlur() {
        this.onTouched();
    }

    public onChange(event, id) {
        console.log('list1', this.modelValue);
        this.dateError = false;
        this.propagateChange(this.modelValue);
    }
}
