import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config: Record<string, string> = {
            required: 'Mandatory',
            invalidEmailAddress: 'Email address not valid',
            invalidPassword: 'At least 6 characters with 1 number',
            minlength: `Min value ${validatorValue?.requiredLength} characters`,
            maxlength: `Max value ${validatorValue?.requiredLength} characters`,
            invalidOldPassword: 'Old password not valid',
            notmatchPasswords: 'Password and Confirm Password do not match',
            emailExists: 'Email already exists'
        };
        return config[validatorName];
    }

    static emailValidator(control: AbstractControl) {
        // RFC 2822 compliant regex
        // eslint-disable-next-line max-len
        const valid = control.value?.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        return valid ? null : { invalidEmailAddress: true };
    }

    static emptyValidator(control: AbstractControl) {
        return control.value?.trim().length > 0 ? null : { required: true };
    }

    static passwordValidator(control: AbstractControl) {
        // {6,100} — between 6 and 100 characters, (?=.*[0-9]) — at least one number
        const valid = control.value?.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/);
        return valid ? null : { invalidPassword: true };
    }

    static matchingPasswords(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password') ?? control.get('newPassword');
        const confirm = control.get('confirmPassword');
        if (password && confirm && password.value !== confirm.value) {
            confirm.setErrors({ notmatchPasswords: true });
            return { notmatchPasswords: true };
        }
        return null;
    }
}
