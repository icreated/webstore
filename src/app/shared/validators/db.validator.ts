import { FormGroup } from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountInfo } from '@api/models/account-info';
import { CommonService } from '@api/services/common.service';


@Injectable({
    providedIn: 'root'
})
export class DBValidator {

    private readonly commonService = inject(CommonService);

    valueAndEmailExists(value: string, value2: string, accountEvent: Observable<AccountInfo>) {
        let oldEmail: string;

        new Promise<AccountInfo>(resolve => {
            accountEvent.subscribe(data => resolve(data));
        }).then(data => {
            oldEmail = data.email ?? '';
        });

        return (group: FormGroup) => {
            const input = group.controls[value];

            if (input?.value && oldEmail && input.value !== oldEmail) {
                this.commonService.lookupEmail({ body: { token: input.value } }).subscribe(
                    (isValid: boolean) => {
                        if (!isValid) {
                            input.setErrors({ emailExists: true });
                        }
                    }
                );
            }
        };
    }
}
