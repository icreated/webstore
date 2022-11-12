import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from './cart.service';
import {AuthService} from '../authentication/auth.service';
import {Order} from 'src/app/shared/models/order';
import {PriceListProduct} from 'src/app/shared/models/pricelist-product';
import {Shipper} from 'src/app/shared/models/shipper';
import {Subject} from 'rxjs';
import {Address} from 'src/app/shared/models/address';
import {PrivateService} from './private.service';


@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    shipAddress: Address = {} as Address;
    billAddress: Address = {} as Address;
    shipper: Shipper = {} as Shipper;
    public order: Order = {} as Order;
    orderSource = new Subject<Order>();
    order$ = this.orderSource.asObservable();

    constructor(private router: Router, private authService: AuthService, public cartService: CartService,
        private privateService: PrivateService) {
    }

    payOrder(order: Order) {
        this.privateService.getOrder(order.id)
            .subscribe(
                (ord: Order) => {
                    this.cartService.clearCart();
                    ord.lines.forEach((item: PriceListProduct, index: number) => {
                        this.cartService.getCart().push(item);
                        this.cartService.synchronize(item);
                    });
                    this.order = ord;
                    this.orderSource.next(ord);
                    this.shipAddress = ord.shipAddress;
                    this.billAddress = ord.billAddress;
                    this.shipper = ord.shipper;
                    this.router.navigate(['/checkout/checkout4']);
                });
    }

    voidCurrentOrder() {
        this.privateService.voidOrder(this.order);
        this.order = {} as Order;
    }

    voidOrder(order: Order) {
        this.privateService.voidOrder(order)
            .subscribe(
                resp => {
                    if (resp.status === 200) {
                        order.docStatus = 'VO';
                    }
                });
    }

    clear() {
        this.order = {} as Order;
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
        if (this.order.id) {
            return this.order.grandTotal;
        }
        let price = this.cartService.getTotalPrice();
        if (this.shipper.id) {
            price = price + this.shipper.price;
        }
        return price;
    }

    createOrder() {
        this.order = {} as Order;
        this.order.shipAddress = this.shipAddress;
        this.order.billAddress = this.billAddress;
        this.order.shipper = this.shipper;
        this.order.lines = this.cartService.getCart();

        /*
       this.privateService.getOrder(1000000).subscribe(
         (order : Order) => {
         this.order = order;
         console.log('HERE: '+order)
         this.orderSource.next(order);
         this.authService.showAlert({type: 'success', msg: 'Order '+order.documentNo+' is generated'});
       });
   */

        this.privateService.createOrder(this.order).subscribe(
            (order: Order) => {
                this.order = order;
                this.orderSource.next(order);
                this.authService.showAlert({type: 'success', msg: 'Order ' + order.documentNo + ' is generated'});
            });
    }
}
