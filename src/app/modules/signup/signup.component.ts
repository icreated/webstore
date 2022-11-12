import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Login} from 'src/app/shared/models/login';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from 'src/app/core/services/validation.service';
import {IdNamePair} from 'src/app/shared/models/id-name-pair';
import {ApiService} from 'src/app/core/services/api.service';
import {Library} from 'src/app/core/library';
import {NewAccount} from '../../shared/models/new-account';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    @Input() redirectTo = 'account';

    account: Login = {} as Login;
    accountForm: FormGroup;
    countries: IdNamePair[] = [];


    constructor(public http: HttpClient, private authService: AuthService, private apiService: ApiService,
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
        this.authService.login(this.account.username, this.account.password, '/home');
    }

    signup(accountForm: FormGroup) {
        if (accountForm.dirty && accountForm.valid) {
            this.authService.signup(accountForm.value, '/home');
        }
    }
}
