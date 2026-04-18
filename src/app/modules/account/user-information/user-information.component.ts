import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { ValidationService } from '@core/services/validation.service';
import { DBValidator } from '@shared/validators/db.validator';
import { AccountInfo } from '@api/models/account-info';
import { AccountService } from '@api/services/account.service';
import { Token } from '@api/models/token';
import { AlertService } from '@core/services/alert.service';
import { ControlMessagesComponent } from '@shared/components/control-messages/control-messages.component';


@Component({
    selector: 'app-user-information',
    templateUrl: './user-information.component.html',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, ControlMessagesComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInformationComponent implements OnInit {

    private readonly accountService = inject(AccountService);
    private readonly alertService = inject(AlertService);
    private readonly dbValidator = inject(DBValidator);
    private readonly builder = inject(FormBuilder);
    private readonly cdr = inject(ChangeDetectorRef);

    account: AccountInfo = {};

    private readonly accountSource = new Subject<AccountInfo>();
    private readonly account$ = this.accountSource.asObservable();

    accountForm: FormGroup = this.builder.group({
        name: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(60)])],
        email: ['', Validators.compose([Validators.required, ValidationService.emailValidator, Validators.minLength(4), Validators.maxLength(60)])],
    }, { validator: this.dbValidator.valueAndEmailExists('email', 'value', this.account$) });

    ngOnInit() {
        this.accountService.getInfo().subscribe((data: AccountInfo) => {
            this.account = data;
            this.accountSource.next(data);
            this.accountForm.controls['name'].setValue(this.account.name);
            this.accountForm.controls['email'].setValue(this.account.email);
            this.cdr.markForCheck();
        });
    }

    save(accountBean: AccountInfo) {
        if (!this.accountForm.dirty || !this.accountForm.valid) return;

        this.accountService.updateAccount({ body: accountBean }).subscribe((_data: Token) => {
            this.accountSource.next(this.account);
            this.alertService.showAlert({ type: 'success', msg: 'Account updated' });
            this.cdr.markForCheck();
        });
    }
}
