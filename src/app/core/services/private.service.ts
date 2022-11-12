import {Injectable} from '@angular/core';
import {Address} from 'src/app/shared/models/address';
import {HEADERS, Library, OPTIONS} from '../library';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Order} from 'src/app/shared/models/order';
import {Observable} from 'rxjs';
import {Token} from 'src/app/shared/models/token';
import {Password} from 'src/app/shared/models/password';
import {Account} from 'src/app/shared/models/account';


@Injectable({
    providedIn: 'root'
})
export class PrivateService {

    addresses: Address[] = [];

    constructor(private http: HttpClient) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(Library.apiEndpoint + 'account/orders', OPTIONS);
    }

    getOrder(id: number) {
        return this.http.get<Order>(Library.apiEndpoint + 'account/order/' + id, OPTIONS);
    }

    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(Library.apiEndpoint + 'checkout/order/create', order, OPTIONS);
    }

    voidOrder(order: Order): Observable<HttpResponse<any>> {
        return this.http.post(Library.apiEndpoint + 'checkout/order/void', order, {
            headers: HEADERS,
            observe: 'response'
        });
    }

    getAccount() {
        return this.http.get<Account>(Library.apiEndpoint + 'account/info', OPTIONS);
    }

    payment(type: string, orderId: number) {
        return this.http.post(Library.apiEndpoint + 'checkout/payment', {type, orderId}, { observe: 'response' });
    }

    updateAccount(account: Account): Observable<Account> {
        return this.http.post<Account>(Library.apiEndpoint + 'account/info/update', account, OPTIONS);
    }

    changePassword(passwordForm: Password) {
        return this.http.post<Token>(Library.apiEndpoint + 'account/password/change', passwordForm, OPTIONS);
    }

    getAddresses(): Observable<Address[]> {
        return new Observable((observer: any) => {
            this.http.get<Address[]>(Library.apiEndpoint + 'account/addresses', OPTIONS)
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
        } else {
            return {} as Address;
        }
    }

    createUpdateAddress(address: Address) {
        return this.http.post<Address>(Library.apiEndpoint + 'account/address/create_update', address, OPTIONS);
    }


    deleteAddress(address: Address): Observable<HttpResponse<any>> {
        return this.http.delete(Library.apiEndpoint + 'account/address/delete/' + address.id, {
            headers: HEADERS,
            observe: 'response'
        });
    }

    getPdfFile(id: number, type: string) {
        return this.http.get(Library.apiEndpoint + 'account/pdf/' + type + '/' + id, {
            headers: HEADERS,
            responseType: 'blob'
            // observe: 'response'
        });
    }
}
