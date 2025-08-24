import { CommentProps } from '@/entities/comment.entity';
import { sequelize } from '@/utils/connectDB';
import { DataTypes, Model, Optional } from 'sequelize';
import BottleModel from '../bottle/sequelize-bottle.model';
import UserModel from '../user/sequelize-user.model';

interface CommentInstance extends Model<CommentProps, Optional<CommentProps, 'id'>>, CommentProps {}

const CommentModel = sequelize.define<CommentInstance>(
  'Comment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'user_id',
    },
    bottleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bottles',
        key: 'id',
      },
      field: 'bottle_id',
    },
    text: {
      type: DataTypes.STRING,
      field: 'text',
      allowNull: false,
    },
  },
  {
    tableName: 'comments',
  },
);
BottleModel.hasMany(CommentModel, {
  foreignKey: 'bottleId',
  as: 'comments',
  onDelete: 'CASCADE',
});

CommentModel.belongsTo(BottleModel, {
  foreignKey: 'bottleId',
  as: 'bottle',
});
UserModel.hasMany(CommentModel, {
  foreignKey: 'userId',
  as: 'comments',
  onDelete: 'CASCADE',
});

CommentModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  as: 'user',
});

export default CommentModel;
