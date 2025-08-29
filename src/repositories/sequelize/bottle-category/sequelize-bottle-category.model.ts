import { sequelize } from '@/utils/connectDB';
import { DataTypes } from 'sequelize';
import CategoryModel from '../category/sequelize-category.model';
import BottleModel from '../bottle/sequelize-bottle.model';

const BottleCategoryModel = sequelize.define(
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

BottleModel.belongsToMany(CategoryModel, { through: BottleCategoryModel, foreignKey: 'bottle_id' });
CategoryModel.belongsToMany(BottleModel, { through: BottleCategoryModel, foreignKey: 'category_id' });

export default BottleCategoryModel;
