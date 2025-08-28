import { CountryProps } from '@/entities/country.entity';
import { sequelize } from '@/utils/connectDB';
import { DataTypes, Model, Optional } from 'sequelize';
import { BottleInstance } from '../bottle/sequelize-bottle.model';

interface CountryInstance extends Model<CountryProps, Optional<CountryProps, 'id'>>, CountryProps {
  getBottles(): BottleInstance[];
}

const CountryModel = sequelize.define<CountryInstance>(
  'Country',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
      unique: true,
    },
  },
  {
    tableName: 'countries',
  },
);

export default CountryModel;
