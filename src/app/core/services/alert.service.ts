import { Injectable } from '@angular/core';
import {Alert} from '../../shared/models/alert';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertSource = new Subject<Alert>();
  alert$ = this.alertSource.asObservable();

  constructor() { }

  showAlert(alert: Alert) {
    this.alertSource.next(alert);
  }
}
