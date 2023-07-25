import {FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountInfo} from '../../api/models/account-info';
import {CommonService} from '../../api/services/common.service';


@Injectable({
    providedIn: 'root'
})
export class DBValidator {

    constructor(private http: HttpClient, private commonService: CommonService) {
    }



    valueAndEmailExists(value: string, value2: string, accountEvent: Observable<AccountInfo>) {

        let oldValue: string;
        let oldEmail: string;

        new Promise(resolve => {
            accountEvent.subscribe(
                (data: AccountInfo) => {
                    resolve(data);
                });
        }).then((data: any) => {
            oldValue = data.value;
            oldEmail = data.email;
        });

        return (group: FormGroup) => {

            const input = group.controls[value];
            const input2 = group.controls[value2];

            if ((input && oldEmail) && input.value && input.value !== oldEmail) {
                this.commonService.lookupEmail({body: {token: input.value}}).subscribe(
                    (isValid: boolean) => {
                        if (isValid) {
                        } else {
                            input.setErrors({emailExists: true});
                        }
                    }
                );
            }
        };
    }

}

