import { PublicationStatusProps } from '@/entities/publication-status.entity';
import { sequelize } from '@/utils/connectDB';
import { DataTypes, Model, Optional } from 'sequelize';
import BottleModel, { BottleInstance } from '../bottle/sequelize-bottle.model';
import CommentModel, { CommentInstance } from '../comments/sequelize-comment.model';

interface PublicationStatusInstance
  extends Model<PublicationStatusProps, Optional<PublicationStatusProps, 'id'>>,
    PublicationStatusProps {
  bottles: BottleInstance[];
  comments: CommentInstance[];
}

const PublicationStatusModel = sequelize.define<PublicationStatusInstance>(
  'PublicationStatus',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    label: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    tableName: 'publication_status',
  },
);

PublicationStatusModel.hasMany(BottleModel, {
  foreignKey: 'publication_status_id',
  as: 'bottles',
});

PublicationStatusModel.hasMany(CommentModel, {
  foreignKey: 'publication_status_id',
  as: 'comments',
});

export default PublicationStatusModel;
