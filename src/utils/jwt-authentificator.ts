import { User } from '@/entities/user.entity';
import { IAuthenticator } from '@/interfaces/authenticator.interface';
import { IUserRepository } from '@/interfaces/user-repository.interface';
import jwt from 'jsonwebtoken';

export class JwtAuthenticator implements IAuthenticator {
  constructor(private readonly userRepository: IUserRepository) {}

  async authenticate(token: string): Promise<User> {
    try {
      const decoded = jwt.verify(token, 'SECRET') as { email: string };
      const user = await this.userRepository.findByEmail(decoded.email);

      if (!user) throw new Error('User not found');

      return user;
    } catch (error) {
      if (error.message == 'User not found') throw error;
      throw new Error('Invalid token');
    }
  }

  generateToken(user: User): string {
    return jwt.sign(
      { email: user.props.email, id: user.props.id, role: user.props.role, pseudo: user.props.pseudo },
      'SECRET_KEY',
      {
        expiresIn: '1h',
      },
    );
  }
}
