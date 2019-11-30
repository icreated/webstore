import {Component, OnInit, OnDestroy, Inject, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PrivateService } from 'src/app/core/services/private.service';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { FileService } from 'src/app/core/services/file.service';
import { Order } from 'src/app/shared/models/order';


@Component({

  selector: 'sp-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  isBrowser: boolean;
  order: Order = <Order>{billAddress:{}, shipAddress:{}};

  constructor(private privateService: PrivateService, private route: ActivatedRoute, private router: Router,
              private checkoutService: CheckoutService, private fileService: FileService) {}

  ngOnInit() {

    this.route.params
      .subscribe(params => {
        let id = params['id'];

        this.privateService.getOrder(id)
          .subscribe(
              (data : Order) => {
              this.order = data;
            });
      });
  }

  downloadOrder() {

      this.fileService.downloadfile(this.order.id, 'order', this.order.documentNo);
  }
}
