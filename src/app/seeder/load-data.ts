import { sequelize } from '@/utils/connectDB';
import container from '../config/dependency-injection';
import { categories } from './data/categories-data';
import { countries } from './data/countries-data';
import { bottles } from './data/bottles-data';
import { publicationStatus } from './data/publication-status-data';

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

async function loadStatus() {
  for (const status in publicationStatus) {
    await container.resolve('publicationStatusService').create(publicationStatus[status]);
  }
}

async function loadBottle() {
  for (const bottle in bottles) {
    await container.resolve('bottleService').createBottle(bottles[bottle]);
  }
}

async function loadData() {
  try {
    await sequelize.sync({ force: true });
    await loadCountry();
    await loadCategory();
    await loadStatus();
    await loadBottle();
    console.log('All data loaded successfully');
  } catch (error) {
    console.error('Failed to load data:', error);
  } finally {
    process.exit();
  }
}

loadData();
