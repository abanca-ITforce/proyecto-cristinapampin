import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private endPoint = 'https://api.worldbank.org/v2';
  private format = '?per_page=1000&format=json';

  constructor(private httpClient: HttpClient) {}

  getAllCountries$() {
    const url = this.endPoint + '/country/' + this.format;
    return this.httpClient.get<any[]>(url).pipe(map(result => result[1]));
  }

  getCountryById$(countryId) {
    const url = this.endPoint + '/country/' + countryId + this.format;
    return this.httpClient.get<any>(url).pipe(map(result => result[1][0]));
  }
  getAllRegions$() {
    const url = this.endPoint + '/region/' + this.format;
    return this.httpClient.get<any[]>(url).pipe(map(result => result[1]));
  }


  getRegionByCode$(regionCode) {
    const url = this.endPoint + '/region/' + regionCode + this.format;
    return this.httpClient.get<any>(url).pipe(map(result => result[1][0]));
  }
  getCountriesByRegion$(regionCode) {
    const url = this.endPoint + '/country' + '?region=' + regionCode + '&per_page=1000&format=json';
    console.log(url);
    return this.httpClient.get<any>(url).pipe(map(result => result[1]));
  }


  getIncomeLevels$() {
    const urlIncomeLevels = 'https://api.worldbank.org/v2/incomeLevel/?format=json';
    return this.httpClient.get<any[]>(urlIncomeLevels).pipe(map(result => result[1]));
  }
  getLendingTypes$() {
    const urlLendingTypes = 'https://api.worldbank.org/v2/lendingType/?format=json';
    return this.httpClient.get<any[]>(urlLendingTypes).pipe(map(result => result[1]));
  }


  getCountriesByFilters(filter: any) {
    const urlFilter = 'https://api.worldbank.org/v2/country?lendingType=' +
    (filter.selectedLendingType ? filter.selectedLendingType : '') +
    '&incomeLevel=' +
    (filter.selectedIncomeLevel ? filter.selectedIncomeLevel : '') +
    '&region=' +
    (filter.selectedRegionFilter ? filter.selectedRegionFilter : '') +
    '&per_page=1000&format=json';
    console.log(urlFilter);
    return this.httpClient.get<any[]>(urlFilter).pipe(map(r => r[1]));

  }
  getCountryDetailsById$(countryId) {
    const url = this.httpClient.get(this.endPoint + '/country/' + countryId +
    '/indicators/SP.POP.TOTL;NY.GDP.MKTP.CD/?source=2&date=2018&per_page=1000&format=json');
    console.log(url);
    return url.pipe(map(result => {
      let results;
      results = {
        pibResult: result[1][0].value,
        totalPopulationResult: result[1][1].value
      };
      return results;
    }));
  }

}
