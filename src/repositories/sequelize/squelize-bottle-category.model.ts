import { sequelize } from '@/utils/connectDB';
import { DataTypes } from 'sequelize';
import BottleModel from './bottle/sequelize-bottle.model';
import CategoryModel from './category/sequelize-category.model';

const BottleCategory = sequelize.define(
  'BottleCategory',
  {
    bottleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bottles',
        key: 'id',
      },
      field: 'bottle_id',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
      field: 'category_id',
    },
  },
  {
    tableName: 'bottles_categories',
  },
);

BottleModel.belongsToMany(CategoryModel, { through: BottleCategory, foreignKey: 'bottle_id' });
CategoryModel.belongsToMany(BottleModel, { through: BottleCategory, foreignKey: 'category_id' });

export default BottleCategory;
