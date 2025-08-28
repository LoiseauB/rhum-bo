import { Country } from '@/entities/country.entity';
import { ICountryRepository } from '@/interfaces/country-repository.interface';
import CountryModel from './sequelize-country.model';

class CountryRepository implements ICountryRepository {
  async createCountry(name: string): Promise<void> {
    await CountryModel.create({ name });
  }

  async getCountryById(id: number): Promise<Country | null> {
    const country = await CountryModel.findByPk(id);
    return country ? new Country(country.toJSON()) : null;
  }

  async getAllCountries(): Promise<Country[]> {
    const countries = await CountryModel.findAll();
    return countries.map(country => new Country(country.toJSON()));
  }

  async updateCountry(id: number, name: string): Promise<Country | null> {
    const country = await CountryModel.findByPk(id);
    if (country) {
      country.name = name;
      const newCountry = await country.save();
      return new Country(newCountry.toJSON());
    }
    return null;
  }

  async deleteCountry(id: number): Promise<void | null> {
    const country = await CountryModel.findByPk(id);
    if (country) {
      return await country.destroy();
    }
    return null;
  }
}

export default new CountryRepository();
