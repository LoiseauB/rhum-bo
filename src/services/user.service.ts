import { User } from '@/entities/user.entity';
import { IIDGenerator } from '@/interfaces/id-generator.interface';
import { IUserRepository } from '@/interfaces/user-repository.interface';
import ProtectPassword from '@/utils/protectPassword';

export type UserPayload = {
  email: string;
  password: string;
  pseudo: string;
  avatar?: string;
};

export default class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly idGenerator: IIDGenerator,
  ) {}

  async createUser({ email, password, pseudo, avatar }: UserPayload): Promise<string> {
    const hashedPassword = await new ProtectPassword(password).hash();
    const id = this.idGenerator.generate();
    const user = new User({ id, email, pseudo, avatar, password: hashedPassword, role: 'USER' });
    await this.userRepository.create(user);
    return id;
  }
}
