import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { validateDate } from './date.validator';

@Directive({
   selector: '[validateDate][ngModel],[validateDate][formControl]',
   providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateValidator), multi: true }
  ]
})

export class DateValidator implements Validator {

    validate(c: FormControl) {
        return validateDate(c);
    }
}
