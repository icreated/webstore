import {Injectable, signal, WritableSignal} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from './cart.service';
import {AuthService} from '../authentication/auth.service';
import {Subject} from 'rxjs';
import {Shipper} from '../../api/models/shipper';
import {Order} from '../../api/models/order';
import {AccountService} from '../../api/services/account.service';
import {Address} from '../../api/models/address';


@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    shipAddress: Address = {} as Address;
    billAddress: Address = {} as Address;
    shipper: Shipper = {} as Shipper;
    public order1!: Order;
    orderSource = new Subject<Order>();
    order$ = this.orderSource.asObservable();

    private order: WritableSignal<Order> = signal({id: 0} as Order);

    constructor(private router: Router, private authService: AuthService, public cartService: CartService,
        private accountService: AccountService, private checkoutService: CheckoutService) {
    }

    getOrder() {
      return this.order();
    }

    payOrder(order: Order) {
      // TODO: SPOK check if this is correct
        const id = order.id ? order.id : 0;
        this.accountService.getOrder({id})
            .subscribe(
                (ord: Order) => {
                    this.cartService.clearCart();
                    // TODO: SPOK check if this is correct
                    // ord.lines.forEach((item: PriceListProduct, index: number) => {
                    //     this.cartService.getCart().push(item);
                    //     this.cartService.synchronize(item);
                    // });
                    // this.order = ord;
                    // this.orderSource.next(ord);
                    // this.shipAddress = ord.shipAddress;
                    // this.billAddress = ord.billAddress;
                    // this.shipper = ord.shipper;
                    this.router.navigate(['/checkout/checkout4']);
                });
    }

    voidCurrentOrder() {
        this.checkoutService.voidOrder(this.order1);
        this.order1 = {} as Order;
    }

    voidOrder(order: Order) {
        this.checkoutService.voidOrder(order);
        // .subscribe(
        //     resp => {
        //         if (resp.status === 200) {
        //             order.docStatus = 'VO';
        //         }
        //     });
    }

    clear() {
        this.order1 = {} as Order;
        this.shipAddress = {} as Address;
        this.billAddress = {} as Address;
        this.shipper = {} as Shipper;
    }

    setShipAddress(address: Address) {
        this.shipAddress = address;
    }

    setBillAddress(address: Address) {
        this.billAddress = address;
    }

    setShipper(shipper: Shipper) {
        this.shipper = shipper;
    }

    getTotalPrice() {
        if (this.order().id) {
            return this.order().grandTotal;
        }
        const price = this.cartService.getTotalPrice();
        if (this.shipper.id) {
            // SPOK price Lost
            //   price = price + this.shipper.price;
        }
        return price;
    }

    createOrder() {
        this.order1 = {} as Order;
        this.order1.shipAddress = this.shipAddress;
        this.order1.billAddress = this.billAddress;
        // SPOK old order object
        // this.order.shipper = this.shipper;
        this.order1.lines = this.cartService.getCart();

        /*
       this.accountService.getOrder(1000000).subscribe(
         (order : Order) => {
         this.order = order;
         console.log('HERE: '+order)
         this.orderSource.next(order);
         this.authService.showAlert({type: 'success', msg: 'Order '+order.documentNo+' is generated'});
       });
   */

        this.checkoutService.createOrder();
        // .subscribe(
        //   (order: Order) => {
        //       this.order = order;
        //       this.orderSource.next(order);
        //       this.authService.showAlert({type: 'success', msg: 'Order ' + order.documentNo + ' is generated'});
        //   });
    }
}
