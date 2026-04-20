import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Alert } from '@shared/models/alert';
import { AlertService } from '@core/services/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    standalone: true,
    imports: [NgClass],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {
    dismissible = true;
    dismissOnTimeout = 3000;

    alert = signal<Alert>({} as Alert);
    closed = signal(false);
    closing = signal(false);
    classes = signal<string[]>([]);

    private alertService = inject(AlertService);

    ngOnInit() {
        this.alertService.alert$.subscribe(alert => {
            this.closed.set(false);
            this.closing.set(false);
            this.alert.set(alert);

            const newClasses = [`alert-${alert.type}`, 'alert-fixed'];
            if (this.dismissible) {
                newClasses.push('alert-dismissible', 'in');
            }
            this.classes.set(newClasses);

            if (this.dismissOnTimeout) {
                setTimeout(() => this.closing.set(true), this.dismissOnTimeout);
                setTimeout(() => this.onClose(), this.dismissOnTimeout + 300);
            }
        });
    }

    onClose(): void {
        this.closed.set(true);
    }
}
