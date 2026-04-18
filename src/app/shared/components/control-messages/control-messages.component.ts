import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ValidationService} from '@core/services/validation.service';

@Component({
    selector: 'app-control-messages',
    templateUrl: './control-messages.component.html',
    styleUrls: ['./control-messages.component.scss'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlMessagesComponent {

    @Input() control: FormControl | undefined;

    get errorMessage(): any {
        if (this.control) {
            for (const propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                    return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
                }
            }
        }
        return null;
    }

}
