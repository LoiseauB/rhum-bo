import { User } from '@/entities/user.entity';
import { RolesEnum } from '@/enums/roles.enum';
import { IIDGenerator } from '@/interfaces/id-generator.interface';
import { IProtectPassword } from '@/interfaces/protect-password.interface';
import { IUserRepository } from '@/interfaces/user-repository.interface';
import UserService from '@/services/user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<IUserRepository>;
  let idGenerator: jest.Mocked<IIDGenerator>;
  let protectPassword: jest.Mocked<IProtectPassword>;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
    };

    idGenerator = {
      generate: jest.fn(),
    };

    protectPassword = {
      hash: jest.fn(),
      compare: jest.fn(),
      validatePassword: jest.fn(),
    };

    userService = new UserService(userRepository, idGenerator, protectPassword);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userPayload = {
        email: 'test@example.com',
        password: 'password123',
        pseudo: 'testuser',
        avatar: 'avatar.png',
      };

      const hashedPassword = 'hashedPassword';
      const id = '123';

      protectPassword.hash.mockResolvedValue(hashedPassword);
      idGenerator.generate.mockReturnValue(id);

      await userService.createUser(userPayload);

      expect(protectPassword.hash).toHaveBeenCalledWith(userPayload.password);
      expect(idGenerator.generate).toHaveBeenCalled();
      expect(userRepository.create).toHaveBeenCalledWith(
        new User({
          id,
          email: userPayload.email,
          pseudo: userPayload.pseudo,
          avatar: userPayload.avatar,
          password: hashedPassword,
          role: RolesEnum.USER,
        }),
      );
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const userId = '123';
      const userPayload = {
        email: 'updated@example.com',
        password: 'newpassword123',
        pseudo: 'updateduser',
        avatar: 'newavatar.png',
      };

      const existingUser = new User({
        id: userId,
        email: 'test@example.com',
        password: 'hashedPassword',
        pseudo: 'testuser',
        role: RolesEnum.USER,
        avatar: 'avatar.png',
      });

      const hashedPassword = 'newHashedPassword';

      userRepository.findById.mockResolvedValue(existingUser);
      protectPassword.validatePassword.mockReturnValue(true);
      protectPassword.hash.mockResolvedValue(hashedPassword);

      await userService.updateUser(userId, userPayload);

      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(protectPassword.validatePassword).toHaveBeenCalledWith(userPayload.password);
      expect(protectPassword.hash).toHaveBeenCalledWith(userPayload.password);
      expect(userRepository.update).toHaveBeenCalledWith(
        new User({
          id: userId,
          email: userPayload.email,
          pseudo: userPayload.pseudo,
          avatar: userPayload.avatar,
          password: hashedPassword,
          role: RolesEnum.USER,
        }),
      );
    });

    it('should throw an error if user is not found', async () => {
      const userId = '123';
      const userPayload = {
        email: 'updated@example.com',
        password: 'newpassword123',
        pseudo: 'updateduser',
        avatar: 'newavatar.png',
      };

      userRepository.findById.mockResolvedValue(null);

      await expect(userService.updateUser(userId, userPayload)).rejects.toThrow('User not found');
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      const userId = '123';

      await userService.deleteUser(userId);

      expect(userRepository.delete).toHaveBeenCalledWith(userId);
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const userId = '123';
      const user = new User({
        id: userId,
        email: 'test@example.com',
        password: 'hashedPassword',
        pseudo: 'testuser',
        role: RolesEnum.USER,
        avatar: 'avatar.png',
      });

      userRepository.findById.mockResolvedValue(user);

      const result = await userService.getUserById(userId);

      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });

    it('should return null if user is not found', async () => {
      const userId = '123';

      userRepository.findById.mockResolvedValue(null);

      const result = await userService.getUserById(userId);

      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(result).toBeNull();
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const user = new User({
        id: '123',
        email,
        password: 'hashedPassword',
        pseudo: 'testuser',
        role: RolesEnum.USER,
        avatar: 'avatar.png',
      });

      userRepository.findByEmail.mockResolvedValue(user);

      const result = await userService.getUserByEmail(email);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(user);
    });

    it('should return null if user is not found', async () => {
      const email = 'test@example.com';

      userRepository.findByEmail.mockResolvedValue(null);

      const result = await userService.getUserByEmail(email);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toBeNull();
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = [
        new User({
          id: '123',
          email: 'test@example.com',
          password: 'hashedPassword',
          pseudo: 'testuser',
          role: RolesEnum.USER,
          avatar: 'avatar.png',
        }),
        new User({
          id: '456',
          email: 'test2@example.com',
          password: 'hashedPassword2',
          pseudo: 'testuser2',
          role: RolesEnum.USER,
          avatar: 'avatar2.png',
        }),
      ];

      userRepository.findAll.mockResolvedValue(users);

      const result = await userService.getAllUsers();

      expect(userRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });
});
