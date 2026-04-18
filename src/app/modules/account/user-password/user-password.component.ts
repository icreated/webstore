import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@core/authentication/auth.service';
import {ValidationService} from '@core/services/validation.service';
import {AccountService} from '@api/services/account.service';
import {Password} from '@api/models/password';
import {AlertService} from '@core/services/alert.service';

@Component({
    selector: 'app-user-password',
    templateUrl: './user-password.component.html',
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPasswordComponent {
    passwordForm: FormGroup;
    active = signal(true);

    constructor(private accountService: AccountService, private authService: AuthService,
                private alertService: AlertService, private builder: FormBuilder) {
        this.passwordForm = this.builder.group({
            password: ['', [Validators.required]],
            newPassword: ['', [Validators.required, ValidationService.passwordValidator]],
            confirmPassword: ['', Validators.required]
        },
        {validators: [ValidationService.matchingPasswords]}
        );
    }

    save(password: Password) {
        if (this.passwordForm.dirty && this.passwordForm.valid) {
            this.accountService.changePassword({body: password}).subscribe(resp => {
                if (!resp.token) {
                    this.passwordForm.controls['password'].setErrors({invalidOldPassword: true});
                } else {
                    this.authService.updateToken(resp);
                    this.alertService.showAlert({type: 'success', msg: 'Password updated'});
                    this.passwordForm.reset();
                    this.active.set(false);
                    setTimeout(() => this.active.set(true), 0);
                }
            });
        }
    }
}
