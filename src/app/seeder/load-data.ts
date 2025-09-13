import { sequelize } from '@/utils/connectDB';
import container from '../config/dependency-injection';
import { categories } from './data/categories-data';
import { countries } from './data/countries-data';

async function loadCountry() {
  for (const country in countries) {
    await container.resolve('countryService').create(countries[country]);
  }
}

async function loadCategory() {
  for (const category in categories) {
    await container.resolve('categoryService').create(categories[category]);
  }
}

async function loadData() {
  try {
    await sequelize.sync({ force: true });
    await loadCountry();
    await loadCategory();
    console.log('All data loaded successfully');
  } catch (error) {
    console.error('Failed to load data:', error);
  } finally {
    process.exit();
  }
}

loadData();
