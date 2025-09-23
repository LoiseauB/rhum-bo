import { CategoryProps } from '@/entities/category.entity';
import { sequelize } from '@/utils/connectDB';
import { DataTypes, Model, Optional } from 'sequelize';

// Define the Category model instance
export interface CategoryInstance extends Model<CategoryProps, Optional<CategoryProps, 'id'>>, CategoryProps {}

// Define the Category model
const CategoryModel = sequelize.define<CategoryInstance>(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'categories',
  },
);

export default CategoryModel;
