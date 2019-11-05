import {Injectable} from '@angular/core';
import { Address } from 'src/app/shared/models/address';
import { Library, OPTIONS, HEADERS } from '../library';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Order } from 'src/app/shared/models/order';
import { Shipper } from 'src/app/shared/models/shipper';
import { Observable } from 'rxjs';
import { Token } from 'src/app/shared/models/token';
import { Password } from 'src/app/shared/models/password';
import { IdNamePair } from 'src/app/shared/models/id-name-pair';
import { Account } from 'src/app/shared/models/account';



@Injectable({
    providedIn: 'root'
})
export class PrivateService {

    addresses: Address[];

    constructor(private http: HttpClient) {}


    getOrders() {
        return this.http.get(Library.API_ENDPOINT + 'account/orders', OPTIONS);
    }

    getOrder(id: number) {
        return this.http.get<Order>(Library.API_ENDPOINT + 'account/order/' + id, OPTIONS);
    }

    createOrder(order: Order) {
        return this.http.post(Library.API_ENDPOINT + 'checkout/order/create', order, OPTIONS);
    }

    voidOrder(order: Order): Observable<HttpResponse<any>> {
        return this.http.post(Library.API_ENDPOINT + 'checkout/order/void', order, {
            headers: HEADERS,
            observe: 'response'
        });
    }

    getAccount() {
        return this.http.get<Account>(Library.API_ENDPOINT + 'account/info', OPTIONS);
    }

    payment(type: string, orderId: number) {
        return this.http.post(Library.API_ENDPOINT + 'checkout/payment', {'type':type, 'orderId':orderId}, { observe: 'response' });
    }

    updateAccount(account: Account) {
        return this.http.post(Library.API_ENDPOINT + 'account/info/update', account, OPTIONS);
    }

    changePassword(passwordForm: Password) {
        return this.http.post<Token>(Library.API_ENDPOINT + 'account/password/change', passwordForm, OPTIONS);
    }

    getAddresses() {
        return Observable.create((observer: any) => {
            this.http.get<Address[]>(Library.API_ENDPOINT + 'account/addresses', OPTIONS)
                .subscribe((data) => {
                    this.addresses = data;
                    observer.next(this.addresses);
                    observer.complete();
                });
        });
    }

    getAddress(id: number | string): Address {
        if (this.addresses) {
            return this.addresses.filter(h => h.id === +id)[0];
        } else
            return <Address>{};

    }

    createUpdateAddress(address: Address) {
        return this.http.post<Address>(Library.API_ENDPOINT + 'account/address/create_update', address, OPTIONS);
    }


    deleteAddress(address: Address): Observable<HttpResponse<any>> {
        return this.http.delete(Library.API_ENDPOINT + 'account/address/delete/' + address.id, {
            headers: HEADERS,
            observe: 'response'
        });
    }

    getPdfFile(id: number, type: string) {
        return this.http.get(Library.API_ENDPOINT + 'account/pdf/' + type + '/' + id, {
            headers: HEADERS,
            responseType: 'blob'
           // observe: 'response'
        });

    }


}
