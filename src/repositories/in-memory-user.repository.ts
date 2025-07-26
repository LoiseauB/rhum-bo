import { User } from '@/entities/user.entity';
import { IUserRepository } from '@/interfaces/user-repository.interface';

export class InMemoryUserRepository implements IUserRepository {
  database: User[];

  constructor() {
    this.database = [];
  }
  async create(user: User): Promise<void> {
    this.database.push(user);
  }
  async update(user: User): Promise<void> {
    const index = this.database.findIndex(u => u.props.id === user.props.id);
    if (index !== -1) {
      this.database[index] = user;
    }
  }
  async delete(id: number): Promise<void> {
    const index = this.database.findIndex(u => u.props.id === id);
    if (index !== -1) {
      this.database.splice(index, 1);
    }
  }
  async findById(id: number): Promise<User | null> {
    return this.database.find(u => u.props.id === id) ?? null;
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.database.find(u => u.props.email === email) ?? null;
  }
  async findAll(): Promise<User[]> {
    return this.database;
  }
}
