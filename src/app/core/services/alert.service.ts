import { Injectable } from '@angular/core';
import { Alert } from '@shared/models/alert';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private readonly alertSource = new Subject<Alert>();
    readonly alert$ = this.alertSource.asObservable();

    showAlert(alert: Alert) {
        this.alertSource.next(alert);
    }
}
