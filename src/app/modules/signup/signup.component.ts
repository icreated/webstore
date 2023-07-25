import {Component, Input} from '@angular/core';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from 'src/app/core/services/validation.service';
import {UserCredentials} from '../../api/models/user-credentials';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    @Input() redirectTo = 'account';

    userCredentials: UserCredentials = {};
    accountForm: FormGroup;


    constructor(public http: HttpClient, private authService: AuthService,
        private router: Router, private route: ActivatedRoute, private builder: FormBuilder) {

        this.accountForm = this.builder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, ValidationService.emailValidator]],
            password: ['', [Validators.required, ValidationService.passwordValidator]],
            confirmPassword: ['', [Validators.required, ValidationService.passwordValidator]],
        },
        {validators: [ValidationService.matchingPasswords]}
        );
    }

    login() {
        this.authService.login(this.userCredentials, '/home');
    }

    signup(accountForm: FormGroup) {
        if (accountForm.dirty && accountForm.valid) {
            this.authService.signup(accountForm.value, '/home');
        }
    }
}
