import { BottleProps } from '@/entities/bottle.entity';
import { sequelize } from '@/utils/connectDB';
import { DataTypes, Model, Optional } from 'sequelize';
import { CategoryInstance } from '../category/sequelize-category.model';
import CommentModel from '../comments/sequelize-comment.model';
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    country_id: {
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

BottleModel.belongsTo(CountryModel, {
  foreignKey: 'country_id',
  as: 'country',
});

BottleModel.belongsTo(PublicationStatusModel, {
  foreignKey: 'publicationStatusId',
  as: 'publicationStatus',
});

BottleModel.hasMany(CommentModel, {
  foreignKey: 'bottleId',
  as: 'comments',
  onDelete: 'CASCADE',
});

export default BottleModel;
