import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {HttpClient} from '@angular/common/http';
import {ValidationService} from 'src/app/core/services/validation.service';
import {DBValidator} from 'src/app/shared/validators/db.validator';
import {AccountInfo} from '../../../api/models/account-info';
import {AccountService} from '../../../api/services/account.service';
import {Token} from '../../../api/models/token';
import {AlertService} from '../../../core/services/alert.service';


@Component({
    selector: 'app-user-information',
    templateUrl: './user-information.component.html'
})
export class UserInformationComponent implements OnInit {

    account: AccountInfo = {};
    accountForm: FormGroup;

    accountSource = new Subject<AccountInfo>();
    account$ = this.accountSource.asObservable();

    constructor(private accountService: AccountService, private alertService: AlertService,
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
        this.accountService.getInfo().subscribe(
            (data: AccountInfo) => {
                this.account = data;
                this.accountSource.next(data);
                this.accountForm.controls['name'].setValue(this.account.name);
                this.accountForm.controls['email'].setValue(this.account.email);
            });
    }

    save(accountBean: AccountInfo) {
        if (this.accountForm.dirty && this.accountForm.valid) {
            this.accountService.updateAccount({body: accountBean}).subscribe(
                (data: Token) => {
                    this.accountSource.next(this.account);
                    this.alertService.showAlert({type: 'success', msg: 'Account updated'});
                });
        }
    }

}
