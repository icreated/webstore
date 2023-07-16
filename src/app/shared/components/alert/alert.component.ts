import {Component, OnInit} from '@angular/core';
import {Alert} from '../../models/alert';
import {AlertService} from '../../../core/services/alert.service';


@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    type = 'warning';
    dismissible = true;
    dismissOnTimeout = 3000;

    alert: Alert = {} as Alert;
    closed = false;
    private classes: Array<string> = [];

    constructor(private alertService: AlertService) {
    }

    public ngOnInit(): any {
        this.alertService.alertSource.subscribe(
            alert => {

                this.closed = false;
                this.alert = alert;
                this.classes[0] = `alert-${this.alert.type}`;
                this.classes[1] = 'alert-fixed';

                if (this.dismissible) {
                    this.classes[2] = 'alert-dismissible';
                    this.classes[3] = 'in';
                } else {
                    this.classes.length = 2;
                }

                if (this.dismissOnTimeout) {
                    setTimeout(() => this.onClose(), this.dismissOnTimeout);
                }
            });
    }


    public onClose(): void {
        this.classes.splice(this.classes.indexOf('in'), 1);
        this.classes.splice(this.classes.indexOf('alert-fixed'), 1);
    }
}

//
