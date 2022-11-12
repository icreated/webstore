import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {ProductCategory} from 'src/app/shared/models/product-category';
import {Library} from '../library';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    categories: ProductCategory[] = [];
    email = Library.webMasterEmail;
    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.apiService.getProductCategories().subscribe(data => {
            this.categories = data;
        });
    }

}
