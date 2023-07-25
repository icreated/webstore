import {Injectable, signal, WritableSignal} from '@angular/core';
import {Shipper} from '../../api/models/shipper';
import {Order} from '../../api/models/order';
import {Address} from '../../api/models/address';


@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    shipAddress: Address = {} as Address;
    billAddress: Address = {} as Address;
    shipper: Shipper = {} as Shipper;

    private order: WritableSignal<Order> = signal({id: 0} as Order);

    setOrder(order: Order) {
      this.order.set(order);
    }

    getOrder() {
      return this.order();
    }

    clear() {
        this.shipAddress = {} as Address;
        this.billAddress = {} as Address;
        this.shipper = {} as Shipper;
    }
}
