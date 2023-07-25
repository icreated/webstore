import {Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import {ProductCategory} from '../../api/models/product-category';
import {CatalogService} from '../../api/services/catalog.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    categories: ProductCategory[] = [];
    email = environment.webmasterEmail;
    constructor(private catalogService: CatalogService) {
    }

    ngOnInit() {
        this.catalogService.getCategories().subscribe(data => {
            this.categories = data;
        });
    }

}
