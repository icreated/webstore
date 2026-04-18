import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormAddressComponent } from '@shared/components/form-address/form-address.component';


@Component({
    selector: 'app-upsert-address',
    templateUrl: './upsert-address.component.html',
    standalone: true,
    imports: [RouterLink, FormAddressComponent],
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
