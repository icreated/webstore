import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { ValidationService } from '@core/services/validation.service';
import { AccountService } from '@api/services/account.service';
import { Password } from '@api/models/password';
import { AlertService } from '@core/services/alert.service';
import { ControlMessagesComponent } from '@shared/components/control-messages/control-messages.component';

@Component({
    selector: 'app-user-password',
    templateUrl: './user-password.component.html',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, ControlMessagesComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPasswordComponent {

    private readonly accountService = inject(AccountService);
    private readonly authService = inject(AuthService);
    private readonly alertService = inject(AlertService);
    private readonly builder = inject(FormBuilder);

    active = signal(true);

    passwordForm: FormGroup = this.builder.group({
        password: ['', [Validators.required]],
        newPassword: ['', [Validators.required, ValidationService.passwordValidator]],
        confirmPassword: ['', Validators.required]
    }, { validators: [ValidationService.matchingPasswords] });

    save(password: Password) {
        if (!this.passwordForm.dirty || !this.passwordForm.valid) return;

        this.accountService.changePassword({ body: password }).subscribe(resp => {
            if (!resp.token) {
                this.passwordForm.controls['password'].setErrors({ invalidOldPassword: true });
            } else {
                this.authService.updateToken(resp);
                this.alertService.showAlert({ type: 'success', msg: 'Password updated' });
                this.passwordForm.reset();
                this.active.set(false);
                setTimeout(() => this.active.set(true), 0);
            }
        });
    }
}
