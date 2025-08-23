import { BottleProps } from '@/entities/bottle.entity';
import { sequelize } from '@/utils/connectDB';
import { DataTypes, Model, Optional } from 'sequelize';
import { CategoryInstance } from '../category/sequelize-category.model';

interface BottleInstance extends Model<BottleProps, Optional<BottleProps, 'id'>>, BottleProps {
  getCategories(): CategoryInstance[];
}

const BottleModel = sequelize.define<BottleInstance>(
  'Bottle',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'bottles',
    hooks: {
      beforeCreate: async bottle => {
        const categories = await bottle.getCategories();
        if (categories.length === 0) {
          throw new Error('Une bouteille doit avoir au moins une catégorie.');
        }
      },
      beforeUpdate: async bottle => {
        const categories = await bottle.getCategories();
        if (categories.length === 0) {
          throw new Error('Une bouteille doit avoir au moins une catégorie.');
        }
      },
    },
  },
);

export default BottleModel;
