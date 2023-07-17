import { Country } from "./country.model";

export interface Region {
    name: string;
    countries: Country[];
}