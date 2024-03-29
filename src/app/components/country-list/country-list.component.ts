import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit, OnDestroy {
  regionName?: string;
  countries: Country[] = [];
  errorMessage: string = '';
  countriesSubscription?: Subscription;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.regionName = this.route.snapshot.params['region'].charAt(0).toUpperCase() + this.route.snapshot.params['region'].slice(1);
    this.countriesSubscription = this.api
      .getRegionByName(this.regionName!)
      .subscribe({next: (region) => {
        this.countries = region.countries;
        this.countries.sort((a, b) => a.translations.pol.common.localeCompare(b.translations.pol.common));
        
      }, error: () => this.errorMessage = 'Countries not found.'});
  }

  ngOnDestroy(): void {
    this.countriesSubscription?.unsubscribe()
  }

  navigateToCountryDetails(countryName: string) {
    this.router.navigate([`${this.regionName?.toLowerCase()}/${countryName}`])
  }
}
