import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'abanca-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  @Input() countryDetails: any;

  constructor() { }

  ngOnInit() {
    console.log(this.countryDetails);
  }

}
