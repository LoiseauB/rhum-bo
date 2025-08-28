import { RateProps } from '@/entities/rate.entity';
import { sequelize } from '@/utils/connectDB';
import { DataTypes, Model } from 'sequelize';
import BottleModel from '../bottle/sequelize-bottle.model';
import UserModel from '../user/sequelize-user.model';

interface RateInstance extends Model<RateProps>, RateProps {}

const RateModel = sequelize.define<RateInstance>(
  'Rate',
  {
    rate: {
      type: DataTypes.TINYINT,
      field: 'rating',
      allowNull: false,
      validate: {
        isIn: [[1, 2, 3, 4, 5]],
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'user_id',
    },
    bottleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'bottles',
        key: 'id',
      },
      field: 'bottle_id',
    },
  },
  {
    tableName: 'rates',
  },
);

BottleModel.hasMany(RateModel, {
  foreignKey: 'bottleId',
  as: 'rates',
  onDelete: 'CASCADE',
});

RateModel.belongsTo(BottleModel, {
  foreignKey: 'bottleId',
  as: 'bottle',
});

UserModel.hasMany(RateModel, {
  foreignKey: 'userId',
  as: 'rates',
  onDelete: 'CASCADE',
});

RateModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  as: 'user',
});

export default RateModel;
