import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-upsert-address',
    templateUrl: './upsert-address.component.html',
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpsertAddressComponent implements OnInit {

    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);

    id = 0;
    isUpdate = false;

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isUpdate = this.id > 0;
    }

    actionEvent() {
        this.router.navigate(['/account/addresses']);
    }
}
