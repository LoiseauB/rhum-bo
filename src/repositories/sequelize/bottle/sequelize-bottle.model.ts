import { BottleProps } from '@/entities/bottle.entity';
import { sequelize } from '@/utils/connectDB';
import { DataTypes, Model, Optional } from 'sequelize';
import { CategoryInstance } from '../category/sequelize-category.model';
import CountryModel from '../country/sequelize-country.model';
import PublicationStatusModel from '../publication-status/sequelize-publication-status.model';

export interface BottleInstance extends Model<BottleProps, Optional<BottleProps, 'id'>>, BottleProps {
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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CountryModel,
        key: 'id',
      },
      field: 'country_id',
    },
    publicationStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PublicationStatusModel,
        key: 'id',
      },
      field: 'publication_status_id',
    },
  },
  {
    tableName: 'bottles',
  },
);

BottleModel.belongsTo(CountryModel, {
  foreignKey: 'country_id',
  as: 'country',
});

CountryModel.hasMany(BottleModel, {
  foreignKey: 'country_id',
  as: 'bottles',
});

BottleModel.belongsTo(PublicationStatusModel, {
  foreignKey: 'publicationStatusId',
  as: 'publicationStatus',
});

PublicationStatusModel.hasMany(BottleModel, {
  foreignKey: 'publication_status_id',
  as: 'bottles',
});

export default BottleModel;
