import { Country, Flags } from './country.model';

export interface CountryDetails extends Country {
  currencies: object;
  capital: string[];
  population: number;
  fifa: string;
}
