import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Region } from 'src/app/models/region.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
})
export class RegionsComponent implements OnInit, OnDestroy {
  constructor(private api: ApiService, private router: Router) {}

  regions: Region[] = [];
  defaultRegionsSubscription?: Subscription;
  errorMessage: string = '';

  ngOnInit(): void {
    this.defaultRegionsSubscription = this.api.getDefaultRegions().subscribe({
      next: (response) => {
        response.subscribe({
          next: (region) => {
            const regionName = region.name.charAt(0).toUpperCase() + region.name.slice(1)
            this.regions.push({name: regionName, countries: region.countries});
          },
          error: () => {
            this.errorMessage = "Regions not found."
          },
          complete: () => {
            this.regions.sort((a, b) => a.name.localeCompare(b.name));
          },
        });
      },
    });
  }

  navigateToCountries(countryName: string): void {
    this.router.navigate([`${countryName}/countries`]);
  }

  ngOnDestroy(): void {
    this.defaultRegionsSubscription?.unsubscribe();
  }
}
