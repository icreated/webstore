import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Login} from 'src/app/shared/models/login';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from 'src/app/core/services/validation.service';
import {IdNamePair} from 'src/app/shared/models/id-name-pair';
import {ApiService} from 'src/app/core/services/api.service';
import {Library} from 'src/app/core/library';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @Input() redirectTo: String = 'account';

  account: Login = <Login>{};
  accountForm: FormGroup;

  selectedCountry!: IdNamePair;
  countries: IdNamePair[] = [];

  constructor(public http: HttpClient, private authService: AuthService, private apiService: ApiService,
              private router: Router, private route: ActivatedRoute, private builder: FormBuilder) {
    this.accountForm = this.builder.group({
        'name': ['', [Validators.required]],
        'email': ['', [Validators.required, ValidationService.emailValidator]],
        'address': ['', [Validators.required]],
        'city': ['', [Validators.required]],
        'postal': ['', [Validators.required]],
        'newPassword': ['', [Validators.required, ValidationService.passwordValidator]],
        'confirmPassword': ['', [Validators.required, ValidationService.passwordValidator]]
      },
      {validator: ValidationService.matchingPasswords('newPassword', 'confirmPassword')}
    );
  }

  ngOnInit() {
    this.apiService.getCountries().subscribe(
      (countries: IdNamePair[]) => {
        this.countries = countries;
        this.selectedCountry = this.countries.filter(f => f.id === Library.CURRENT_COUNTRY_ID)[0];
      });
  }


  login() {
    this.authService.login(this.account.username, this.account.password, '/home');
  }

}
