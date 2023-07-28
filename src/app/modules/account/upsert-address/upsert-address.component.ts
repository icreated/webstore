import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-upsert-address',
    templateUrl: './upsert-address.component.html'
})
export class UpsertAddressComponent implements OnInit {

  id = 0;
  isUpdate = false;


  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isUpdate = this.id > 0;
  }

  actionEvent() {
    this.router.navigate(['/account/addresses']);
  }




}
