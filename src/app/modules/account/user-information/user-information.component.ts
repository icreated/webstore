import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {PrivateService} from 'src/app/core/services/private.service';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {HttpClient} from '@angular/common/http';
import {ValidationService} from 'src/app/core/services/validation.service';
import {Account} from 'src/app/shared/models/account';
import {DBValidator} from 'src/app/shared/validators/db.validator';


@Component({
    selector: 'app-user-information',
    templateUrl: './user-information.component.html'
})
export class UserInformationComponent implements OnInit {

    account: Account = {} as Account;
    accountForm: FormGroup;

    accountSource = new Subject<Account>();
    account$ = this.accountSource.asObservable();

    constructor(private privateService: PrivateService, private authService: AuthService,
        private builder: FormBuilder, private http: HttpClient, private dbvalidator: DBValidator) {

        this.accountForm = this.builder.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(60)])],
            email: ['', Validators.compose([Validators.required, ValidationService.emailValidator, Validators.minLength(4),
                Validators.maxLength(60)])],
        },
        {validator: this.dbvalidator.valueAndEmailExists('email', 'value', this.account$)}
        );
    }

    ngOnInit() {
        this.privateService.getAccount().subscribe(
            (data: Account) => {
                this.account = data;
                this.accountSource.next(data);
                this.accountForm.controls['name'].setValue(this.account.name);
                this.accountForm.controls['email'].setValue(this.account.email);
            });
    }

    save(accountBean: Account) {
        if (this.accountForm.dirty && this.accountForm.valid) {
            this.privateService.updateAccount(accountBean).subscribe(
                (data: Account) => {
                    this.accountSource.next(this.account);
                    this.authService.showAlert({type: 'success', msg: 'Account updated'});
                });
        }
    }

}
