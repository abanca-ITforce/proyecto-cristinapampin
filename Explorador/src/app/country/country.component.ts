import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  country$: Observable<any>;
  countryDetails$: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    const countryId = this.activatedRoute.snapshot.params.countryId;
    this.country$ = this.api.getCountryById$(countryId);
    this.countryDetails$ = this.api.getCountryDetailsById$(countryId);
  }
}
