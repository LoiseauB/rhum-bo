import { PublicationStatusProps } from '@/entities/publication-status.entity';
import { sequelize } from '@/utils/connectDB';
import { DataTypes, Model, Optional } from 'sequelize';
import { BottleInstance } from '../bottle/sequelize-bottle.model';
import { CommentInstance } from '../comments/sequelize-comment.model';

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

export default PublicationStatusModel;
