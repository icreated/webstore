import {Component, OnInit} from '@angular/core';
import {Library} from '../library';
import {ProductCategory} from '../../api/models/product-category';
import {CatalogService} from '../../api/services/catalog.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    categories: ProductCategory[] = [];
    email = Library.webMasterEmail;
    constructor(private catalogService: CatalogService) {
    }

    ngOnInit() {
        this.catalogService.getCategories().subscribe(data => {
            this.categories = data;
        });
    }

}
