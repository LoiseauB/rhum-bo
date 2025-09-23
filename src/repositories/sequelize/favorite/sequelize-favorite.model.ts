import { sequelize } from '@/utils/connectDB';
import { DataTypes } from 'sequelize';
import BottleModel from '../bottle/sequelize-bottle.model';
import UserModel from '../user/sequelize-user.model';

const FavoriteModel = sequelize.define(
  'Favorite',
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

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'user_id',
    },
  },
  {
    tableName: 'favorites',
  },
);

BottleModel.belongsToMany(UserModel, { through: FavoriteModel, foreignKey: 'bottle_id' });
UserModel.belongsToMany(BottleModel, { through: FavoriteModel, foreignKey: 'user_id' });

export default FavoriteModel;
