import { User } from '@/entities/user.entity';
import { IUserRepository } from '@/interfaces/user-repository.interface';
import UserModel from './sequelize-user.model';

export default class SequelizeUserRepository implements IUserRepository {
  async create(user: User): Promise<void> {
    await UserModel.create(user.props);
  }
  async update(user: User): Promise<void> {
    await UserModel.update(user.props, { where: { id: user.props.id } });
  }
  async delete(id: string): Promise<void> {
    await UserModel.destroy({ where: { id } });
  }
  async findById(id: string): Promise<User | null> {
    const user = await UserModel.scope('withoutPassword').findByPk(id);
    return user ? new User(user.toJSON()) : null;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { email } });
    return user ? new User(user.toJSON()) : null;
  }
  async findAll(): Promise<User[]> {
    const users = await UserModel.scope('withoutPassword').findAll();
    return users.map(user => new User(user.toJSON()));
  }
}
