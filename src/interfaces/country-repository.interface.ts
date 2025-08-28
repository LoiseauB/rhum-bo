import { Country } from '@/entities/country.entity';

export interface ICountryRepository {
  createCountry(name: string): Promise<void>;
  getCountryById(id: number): Promise<Country | null>;
  getAllCountries(): Promise<Country[]>;
  updateCountry(id: number, name: string): Promise<Country | null>;
  deleteCountry(id: number): Promise<void | null>;
}
