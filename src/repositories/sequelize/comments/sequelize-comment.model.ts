import { CommentProps } from '@/entities/comment.entity';
import { sequelize } from '@/utils/connectDB';
import { DataTypes, Model, Optional } from 'sequelize';
import BottleModel from '../bottle/sequelize-bottle.model';
import PublicationStatusModel from '../publication-status/sequelize-publication-status.model';
import UserModel from '../user/sequelize-user.model';

export interface CommentInstance extends Model<CommentProps, Optional<CommentProps, 'id'>>, CommentProps {}

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
    publicationStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'publication_status',
        key: 'id',
      },
      field: 'publication_status_id',
    },
    text: {
      type: DataTypes.TEXT,
      field: 'text',
      allowNull: false,
    },
  },
  {
    tableName: 'comments',
  },
);

CommentModel.belongsTo(BottleModel, {
  foreignKey: 'bottleId',
  as: 'bottle',
});

CommentModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  as: 'user',
});

CommentModel.belongsTo(PublicationStatusModel, {
  foreignKey: 'publicationStatusId',
  as: 'publicationStatus',
});

export default CommentModel;
