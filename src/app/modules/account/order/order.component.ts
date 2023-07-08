import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FileService} from 'src/app/core/services/file.service';
import {AccountService} from '../../../api/services/account.service';
import {Order} from '../../../api/models/order';


@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

    order!: Order;

    constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router,
                private fileService: FileService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        this.accountService
            .getOrder({id})
            .subscribe(data => this.order = data);
    }

    voidOrder() {
        this.accountService.voidOrder({id: this.order.id});
    }

    downloadOrder() {
        this.fileService.downloadfile(this.order.id, 'order', this.order.documentNo || 'order');
    }
}
