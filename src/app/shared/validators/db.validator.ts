import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {ReflectiveInjector, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import { Library, OPTIONS } from 'src/app/core/library';
import { Observable } from 'rxjs';
import { Account } from '../models/account';


@Injectable({
  providedIn: 'root'
})
export class DBValidator {

  constructor (private http: HttpClient) {}


  static isPresent(obj: any) {
    return obj !== undefined && obj !== null;
  }



  asyncValidator(control:any): any {
    let p = new Promise(resolve => {
      this.http.post(Library.API_ENDPOINT+'common/lookup/email', JSON.stringify({ 'token': control.value}), OPTIONS)
        .subscribe(
          (response:any)  => {
            if (response.text() === 'true') {
              resolve(null);
            } else {
              resolve({'emailExists': true});
            }
            //return null;
          }
        );
    });
    return p;
  }


  emailExists(value:string) {

    return new Promise( resolve => {


      this.http.post(Library.API_ENDPOINT+'common/lookup/email', { 'token': value}, OPTIONS)
        .subscribe(
          (response:any)  => {

            if (response === true) {
              resolve(null);
            } else {
              resolve({'emailExists': true});
            }

          }
        );
    });

  }


    emailNotExists(value:string) {

        return new Promise( resolve => {

            this.http.post(Library.API_ENDPOINT+'common/lookup/email', { 'token': value}, OPTIONS)
                .subscribe(
                    (response:any)  => {

                        if (response === true) {
                            resolve({'emailNotExists': true});
                        } else {
                            resolve(null);
                        }
                    }
                );
        });

    }




  valueAndEmailExists(value:string, value2:string, accountEvent: Observable<Account>) {



    let oldValue : string;
    let oldEmail : string;

    new Promise( resolve => {
      accountEvent.subscribe(
        data => {
          resolve(data);
        });
    }).then((data:Account) => {
      oldValue = data.value;
      oldEmail = data.email;
    });

    return (group: FormGroup) => {

      let input = group.controls[value];
      let input2 = group.controls[value2];

      if ((input && oldEmail) && input.value && input.value !== oldEmail) {
        this.http.post(Library.API_ENDPOINT+'common/lookup/email', { 'token': input.value}, OPTIONS)
          .subscribe(
            (isValid: boolean)  => {
              if (isValid) {
              } else {
                input.setErrors({'emailExists': true});
              }

            }
          );
      }

      if ((input2 && oldEmail) && input2.value && input2.value !== oldValue) {
        this.http.post(Library.API_ENDPOINT+'common/lookup/username', { 'token': input2.value}, OPTIONS)
          .subscribe(
            (isValid: boolean)  => {
              if (isValid) {
              } else {
                input2.setErrors({'valueExists': true});
              }

            }
          );
      }

    };
  }


  valueExists(control: FormControl) {

    let injector = ReflectiveInjector.resolveAndCreate([HttpClient]);
    let http = injector.get(HttpClient);

    return new Promise( resolve => {

      http.post(Library.API_ENDPOINT+'common/lookup/username', JSON.stringify({ 'token': control.value}), OPTIONS)
        .subscribe(
          (response:any)  => {
            if (response.text() === 'true') {
              //resolve(null);
            } else {
              control.setErrors({'valueExists': true});
              //resolve({'valueExists': true});
            }
            //return null;
          }
        );
    });

  }

}

