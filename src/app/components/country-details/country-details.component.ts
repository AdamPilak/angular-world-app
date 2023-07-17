import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CountryDetails } from 'src/app/models/countryDetails.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detailed-country-data',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  country?: CountryDetails;
  currency?: any
  regionName?: string;
  errorMessage: string = '';
  countryDetailsSubscription?: Subscription;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.regionName = this.route.snapshot.params['region']
    let countryName = this.route.snapshot.params['country']
    this.countryDetailsSubscription = this.api.getCountryDetailsByName(countryName).subscribe({next: countryDetails => {
      this.country = countryDetails
      this.currency = Object.values(countryDetails.currencies)[0]['symbol']
    }, error: () => this.errorMessage = "Country not found."})
  }

  ngOnDestroy(): void {
    this.countryDetailsSubscription?.unsubscribe()
  }
}
