import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/environment';
import { concat, map, Observable } from 'rxjs';
import { Region } from '../models/region.model';
import { Country } from '../models/country.model';
import { CountryDetails } from '../models/countryDetails.model';

const REGION_ENDPOINT = 'region';
const TRANSLATION_ENDPOINT = 'translation';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getRegionByName(regionName: string): Observable<Region> {
    return this.http
      .get(
        `${API_URL}/${REGION_ENDPOINT}/${regionName}?fields=name,flags,translations`
      )
      .pipe(
        map((countries) => ({
          name: regionName,
          countries: countries as Country[],
        }))
      );
  }

  getCountryDetailsByName(name: string): Observable<CountryDetails> {
    return this.http
      .get<CountryDetails[]>(
        `${API_URL}/name/${name}?fields=name,flags,fifa,population,capital,currencies,translations`
      )
      .pipe(map((countryDetails) => countryDetails[0]));
  }

  getDefaultRegions(): Observable<Observable<Region>> {
    const defaultRegionsSequence = concat([
      this.getRegionByName('africa'),
      this.getRegionByName('americas'),
      this.getRegionByName('asia'),
      this.getRegionByName('europe'),
      this.getRegionByName('oceania'),
    ]);

    return defaultRegionsSequence;
  }
}
