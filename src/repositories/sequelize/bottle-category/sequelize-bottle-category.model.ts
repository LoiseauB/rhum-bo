import { sequelize } from '@/utils/connectDB';
import BottleModel from '../bottle/sequelize-bottle.model';
import CategoryModel from '../category/sequelize-category.model';

const BottleCategoryModel = sequelize.define(
  'BottleCategory',
  {},
  {
    tableName: 'bottles_categories',
    underscored: true,
  },
);

BottleModel.belongsToMany(CategoryModel, { through: BottleCategoryModel, foreignKey: 'bottle_id' });
CategoryModel.belongsToMany(BottleModel, { through: BottleCategoryModel, foreignKey: 'category_id' });

export default BottleCategoryModel;
