import { User } from '@/entities/user.entity';
import { RolesEnum } from '@/enums/roles.enum';
import { IAuthenticator } from '@/interfaces/authenticator.interface';
import { IProtectPassword } from '@/interfaces/protect-password.interface';
import { IUserRepository } from '@/interfaces/user-repository.interface';
import AuthService from '../services/auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepositoryMock: jest.Mocked<IUserRepository>;
  let authenticatorMock: jest.Mocked<IAuthenticator>;
  let protectPasswordMock: jest.Mocked<IProtectPassword>;

  beforeEach(() => {
    userRepositoryMock = {
      findByEmail: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    authenticatorMock = {
      generateToken: jest.fn(),
    } as unknown as jest.Mocked<IAuthenticator>;

    protectPasswordMock = {
      compare: jest.fn(),
    } as unknown as jest.Mocked<IProtectPassword>;

    authService = new AuthService(userRepositoryMock, authenticatorMock, protectPasswordMock);
  });

  describe('login', () => {
    it('should return a token when credentials are valid', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user = new User({ password: 'hashedPassword', email, id: '123', pseudo: 'test', role: RolesEnum.USER });
      const token = 'generatedToken';

      userRepositoryMock.findByEmail.mockResolvedValue(user);
      protectPasswordMock.compare.mockResolvedValue(true);
      authenticatorMock.generateToken.mockReturnValue(token);

      const result = await authService.login(email, password);

      expect(result).toBe(token);
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
      expect(protectPasswordMock.compare).toHaveBeenCalledWith(password, user.props.password);
      expect(authenticatorMock.generateToken).toHaveBeenCalledWith(user);
    });

    it('should throw an error when user is not found', async () => {
      const email = 'test@example.com';
      const password = 'password';

      userRepositoryMock.findByEmail.mockResolvedValue(null);

      await expect(authService.login(email, password)).rejects.toThrow('Invalid email or password');
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
      expect(protectPasswordMock.compare).not.toHaveBeenCalled();
      expect(authenticatorMock.generateToken).not.toHaveBeenCalled();
    });

    it('should throw an error when password is invalid', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user = new User({ password: 'hashedPassword', email, id: '123', pseudo: 'test', role: RolesEnum.USER });

      userRepositoryMock.findByEmail.mockResolvedValue(user);
      protectPasswordMock.compare.mockResolvedValue(false);

      await expect(authService.login(email, password)).rejects.toThrow('Invalid email or password');
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
      expect(protectPasswordMock.compare).toHaveBeenCalledWith(password, user.props.password);
      expect(authenticatorMock.generateToken).not.toHaveBeenCalled();
    });
  });
});
