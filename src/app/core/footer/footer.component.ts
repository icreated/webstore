import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';
import { ProductCategory } from '@api/models/product-category';
import { CatalogService } from '@api/services/catalog.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
    categories = toSignal(inject(CatalogService).getCategories(), { initialValue: [] as ProductCategory[] });
    email = environment.webmasterEmail;
}
