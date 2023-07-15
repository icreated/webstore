import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Library, OPTIONS} from 'src/app/core/library';
import {Observable} from 'rxjs';
import {AccountInfo} from '../../api/models/account-info';


@Injectable({
    providedIn: 'root'
})
export class DBValidator {

    constructor(private http: HttpClient) {
    }

    static isPresent(obj: any) {
        return obj !== undefined && obj !== null;
    }


    asyncValidator(control: any): any {
        const p = new Promise(resolve => {
            this.http.post(Library.apiEndpoint + 'common/lookup/email', JSON.stringify({token: control.value}), OPTIONS)
                .subscribe(
                    (response: any) => {
                        if (response.text() === 'true') {
                            resolve(null);
                        } else {
                            resolve({emailExists: true});
                        }
                        // return null;
                    }
                );
        });
        return p;
    }


    emailExists(value: string) {
        return new Promise(resolve => {
            this.http.post(Library.apiEndpoint + 'common/lookup/email', {token: value}, OPTIONS)
                .subscribe(
                    (response: any) => {
                        if (response === true) {
                            resolve(null);
                        } else {
                            resolve({emailExists: true});
                        }
                    }
                );
        });
    }


    emailNotExists(value: string) {
        return new Promise(resolve => {
            this.http.post(Library.apiEndpoint + 'common/lookup/email', {token: value}, OPTIONS)
                .subscribe(
                    (response: any) => {
                        if (response === true) {
                            resolve({emailNotExists: true});
                        } else {
                            resolve(null);
                        }
                    }
                );
        });
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
                this.http.post<boolean>(Library.apiEndpoint + 'common/lookup/email', {token: input.value}, OPTIONS)
                    .subscribe(
                        (isValid: boolean) => {
                            if (isValid) {
                            } else {
                                input.setErrors({emailExists: true});
                            }
                        }
                    );
            }

            if ((input2 && oldEmail) && input2.value && input2.value !== oldValue) {
                this.http.post<boolean>(Library.apiEndpoint + 'common/lookup/username', {token: input2.value}, OPTIONS)
                    .subscribe(
                        (isValid: boolean) => {
                            if (isValid) {
                            } else {
                                input2.setErrors({valueExists: true});
                            }
                        }
                    );
            }
        };
    }


    valueExists(control: FormControl) {
        return new Promise(resolve => {
            this.http.post(Library.apiEndpoint + 'common/lookup/username', JSON.stringify({token: control.value}), OPTIONS)
                .subscribe(
                    (response: any) => {
                        if (response.text() === 'true') {
                            // resolve(null);
                        } else {
                            control.setErrors({valueExists: true});
                            // resolve({'valueExists': true});
                        }
                        // return null;
                    }
                );
        });
    }

}

