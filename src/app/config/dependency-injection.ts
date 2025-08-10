import SequelizeUserRepository from '@/repositories/sequelize/user/sequelize-user.repository';
import UserService from '@/services/user.service';
import { asClass, asValue, createContainer } from 'awilix';
import { IAuthenticator } from '../../interfaces/authenticator.interface';
import { IIDGenerator } from '../../interfaces/id-generator.interface';
import { UUIDGenerator } from '../../utils/uuid-generator';
import { IProtectPassword } from '@/interfaces/protect-password.interface';
import ProtectPassword from '@/utils/protectPassword';
import { JwtAuthenticator } from '@/utils/jwt-authentificator';
import AuthService from '@/services/auth.service';

export interface Dependencies {
  userService: UserService;
  authService: AuthService;
  userRepository: SequelizeUserRepository;
  authenticator: IAuthenticator;
  idGenerator: IIDGenerator;
  protectPassword: IProtectPassword;
}

const container = createContainer<Dependencies>();

container.register({
  userRepository: asValue(new SequelizeUserRepository()),
  idGenerator: asClass(UUIDGenerator).singleton(),
  protectPassword: asClass(ProtectPassword).singleton(),
});

const userRepository = container.resolve('userRepository');
const idGenerator = container.resolve('idGenerator');
const protectPassword = container.resolve('protectPassword');

container.register({
  authenticator: asValue(new JwtAuthenticator(userRepository)),
  userService: asValue(new UserService(userRepository, idGenerator, protectPassword)),
});

const authenticator = container.resolve('authenticator');

container.register({
  authService: asValue(new AuthService(userRepository, authenticator, protectPassword)),
});

export default container;
