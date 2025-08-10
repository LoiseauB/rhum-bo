import { IAuthenticator } from '@/interfaces/authenticator.interface';
import { IProtectPassword } from '@/interfaces/protect-password.interface';
import { IUserRepository } from '@/interfaces/user-repository.interface';

export default class AuthService {
  constructor(
    private readonly userService: IUserRepository,
    private readonly authenticator: IAuthenticator,
    private readonly protectPassword: IProtectPassword,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new Error('Invalid email or password');
    const isPasswordValid = await this.protectPassword.compare(password, user.props.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');
    return this.authenticator.generateToken(user);
  }
}
