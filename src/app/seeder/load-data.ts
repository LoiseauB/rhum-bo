import { sequelize } from '@/utils/connectDB';
import container from '../config/dependency-injection';
import { countries } from './countries-data';

async function loadCountry() {
  for (const country in countries) {
    await container.resolve('countryService').create(countries[country]);
  }
}

async function loadData() {
  try {
    await sequelize.sync({ force: true });
    await loadCountry();
    console.log('All data loaded successfully');
  } catch (error) {
    console.error('Failed to load data:', error);
  } finally {
    process.exit();
  }
}

loadData();
