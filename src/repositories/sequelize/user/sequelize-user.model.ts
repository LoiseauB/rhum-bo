import { UserProps } from '@/entities/user.entity';
import { sequelize } from '@/utils/connectDB';
import { DataTypes, Model, Optional } from 'sequelize';

// Define the User model interface
interface UserInstance extends Model<UserProps, Optional<UserProps, 'id'>>, UserProps {}

// Define the User model
const UserModel = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pseudo: {
      type: DataTypes.STRING,
      field: 'pseudo',
      allowNull: false,
      unique: true,
      validate: {
        min: 3,
      },
    },
    role: {
      type: DataTypes.STRING,
      field: 'role',
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      field: 'avatar',
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      },
    },
  },
);

export default UserModel;
