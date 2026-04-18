import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AuthService } from '@core/authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from '@core/services/validation.service';
import { UserCredentials } from '@api/models/user-credentials';
import { ControlMessagesComponent } from '@shared/components/control-messages/control-messages.component';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, TabsModule, ControlMessagesComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {

    @Input() redirectTo = 'account';

    userCredentials: UserCredentials = {};

    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly builder = inject(FormBuilder);

    accountForm: FormGroup = this.builder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, ValidationService.emailValidator]],
        password: ['', [Validators.required, ValidationService.passwordValidator]],
        confirmPassword: ['', [Validators.required, ValidationService.passwordValidator]],
    }, { validators: [ValidationService.matchingPasswords] });

    login() {
        this.authService.login(this.userCredentials, '/home');
    }

    signup(accountForm: FormGroup) {
        if (accountForm.dirty && accountForm.valid) {
            this.authService.signup(accountForm.value, '/home');
        }
    }
}
