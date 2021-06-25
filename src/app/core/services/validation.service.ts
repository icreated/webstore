import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() {
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config: any = {
      'required': 'Mandatory',
      'invalidEmailAddress': 'Email address not valid',
      'invalidPassword': 'At least 6 characters with 1 number',
      'minlength': `Min value ${validatorValue.requiredLength} characters`,
      'maxlength': `Max value ${validatorValue.requiredLength} characters`,
      'invalidOldPassword': 'Old password not valid',
      'notmatchPasswords': 'Password and Confirm Password do not match',
      'emailExists': 'Email already exists'
    };
    return config[validatorName];
  }

  static emailValidator(control: any) {
    // RFC 2822 compliant regex
    // tslint:disable-next-line:max-line-length
    if (control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {'invalidEmailAddress': true};
    }
  }

  static emptyValidator(control: any) {
    // RFC 2822 compliant regex
    if (control.value && control.value.trim().length > 0) {
      return null;
    } else {
      return {'required': true};
    }
  }

  static passwordValidator(control: any) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value && control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return {'invalidPassword': true};
    }
  }

  static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[confirmPasswordKey];
      if ((passwordInput && passwordConfirmationInput) && passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({'notmatchPasswords': true});
      }
    };
  }
}
