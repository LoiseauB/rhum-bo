import { ICountryRepository } from '@/interfaces/country-repository.interface';

export default class CountryService {
  constructor(private readonly countryRepository: ICountryRepository) {}

  async create(name: string) {
    await this.countryRepository.createCountry(name);
  }

  async getAll() {
    return await this.countryRepository.getAllCountries();
  }

  async update(id: number, name: string) {
    return await this.countryRepository.updateCountry(id, name);
  }

  async delete(id: number) {
    return await this.countryRepository.deleteCountry(id);
  }
}
