import {Injectable, signal, WritableSignal} from '@angular/core';
import {Shipper} from '@api/models/shipper';
import {Order} from '@api/models/order';
import {Address} from '@api/models/address';


@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    shipAddress: Address = {} as Address;
    billAddress: Address = {} as Address;
    shipper: Shipper = {} as Shipper;

    private orderSignal: WritableSignal<Order> = signal({id: 0} as Order);

    readonly order = this.orderSignal.asReadonly();

    setOrder(order: Order) {
      this.orderSignal.set(order);
    }

    clear() {
        this.shipAddress = {} as Address;
        this.billAddress = {} as Address;
        this.shipper = {} as Shipper;
    }
}
