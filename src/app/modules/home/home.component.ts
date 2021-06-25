import {Component, OnInit} from '@angular/core';
import {ApiService} from 'src/app/core/services/api.service';
import {PriceListProduct} from 'src/app/shared/models/pricelist-product';
import {CartService} from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredProducts: PriceListProduct[];

  constructor(private apiService: ApiService, private cartService: CartService) {
  }

  ngOnInit() {
    this.apiService.getFeaturedProducts().subscribe(data => {
      this.featuredProducts = data;
    });
  }

  add(item: PriceListProduct) {
    this.cartService.addItem(item);
  }

}
