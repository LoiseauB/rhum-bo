import { User } from '@/entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
