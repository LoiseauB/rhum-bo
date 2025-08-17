import { User } from '@/entities/user.entity';
import { RolesEnum } from '@/enums/roles.enum';
import { IIDGenerator } from '@/interfaces/id-generator.interface';
import { IImageSaver } from '@/interfaces/image-saver.interface';
import { IProtectPassword } from '@/interfaces/protect-password.interface';
import { IUserRepository } from '@/interfaces/user-repository.interface';

export type UserPayload = {
  email: string;
  password: string;
  pseudo: string;
  avatar?: Buffer;
};

export default class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly idGenerator: IIDGenerator,
    private readonly protectPassword: IProtectPassword,
    private readonly imageSaver: IImageSaver,
  ) {}

  async createUser({ email, password, pseudo, avatar }: UserPayload): Promise<string> {
    const hashedPassword = await this.protectPassword.hash(password);
    const id = this.idGenerator.generate();
    const avatarUrl = avatar ? await this.imageSaver.uploadImage(id, avatar, 'avatars') : undefined;
    const user = new User({ id, email, pseudo, avatar: avatarUrl, password: hashedPassword, role: RolesEnum.USER });
    await this.userRepository.create(user);
    return id;
  }

  async updateUser(id: string, { email, password, pseudo, avatar }: UserPayload, role?: RolesEnum): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');
    let hashedPassword;
    if (password && this.protectPassword.validatePassword(password)) {
      hashedPassword = await this.protectPassword.hash(password);
    }
    let avatarUrl: string | undefined;
    if (avatar) {
      if (user.props.avatar) {
        await this.imageSaver.deleteImage(user.props.avatar);
      }
      avatarUrl = await this.imageSaver.uploadImage(id, avatar, 'avatars');
    }
    user.props = {
      ...user.props,
      email,
      pseudo,
      avatar: avatarUrl,
      password: hashedPassword,
      role: role || user.props.role,
    };
    await this.userRepository.update(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (user?.props.avatar) await this.imageSaver.deleteImage(user.props.avatar);
    await this.userRepository.delete(id);
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
