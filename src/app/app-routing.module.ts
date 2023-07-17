import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { RegionsComponent } from './components/regions/regions.component';

const routes: Routes = [

  { path: '', redirectTo: '/regions', pathMatch: 'full' },
  { path: 'regions', component: RegionsComponent },
  { path: ':region/countries', component: CountryListComponent },
  { path: ':region/:country', component: CountryDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
