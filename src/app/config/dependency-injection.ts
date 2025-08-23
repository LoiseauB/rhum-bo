import { IImageSaver } from '@/interfaces/image-saver.interface';
import { IProtectPassword } from '@/interfaces/protect-password.interface';
import SequelizeUserRepository from '@/repositories/sequelize/user/sequelize-user.repository';
import AuthService from '@/services/auth.service';
import S3Service from '@/services/s3.service';
import UserService from '@/services/user.service';
import { JwtAuthenticator } from '@/utils/jwt-authentificator';
import ProtectPassword from '@/utils/protectPassword';
import { s3Client } from '@/utils/s3Client';
import { asClass, asValue, createContainer } from 'awilix';
import { IAuthenticator } from '../../interfaces/authenticator.interface';
import { IIDGenerator } from '../../interfaces/id-generator.interface';
import { UUIDGenerator } from '../../utils/uuid-generator';
import SequelizeCategoryRepository from '@/repositories/sequelize/category/sequelize-category.repository';
import CathegoryService from '@/services/category.service';

export interface Dependencies {
  userService: UserService;
  authService: AuthService;
  userRepository: SequelizeUserRepository;
  authenticator: IAuthenticator;
  idGenerator: IIDGenerator;
  protectPassword: IProtectPassword;
  imageSaver: IImageSaver;
  categoryRepository: SequelizeCategoryRepository;
  categoryService: CathegoryService;
}

const container = createContainer<Dependencies>();

container.register({
  userRepository: asValue(new SequelizeUserRepository()),
  idGenerator: asClass(UUIDGenerator).singleton(),
  protectPassword: asClass(ProtectPassword).singleton(),
  imageSaver: asValue(new S3Service(s3Client)),
  categoryRepository: asValue(new SequelizeCategoryRepository()),
});

const userRepository = container.resolve('userRepository');
const idGenerator = container.resolve('idGenerator');
const protectPassword = container.resolve('protectPassword');
const imageSaver = container.resolve('imageSaver');
const categoryRepository = container.resolve('categoryRepository');

container.register({
  authenticator: asValue(new JwtAuthenticator(userRepository)),
  userService: asValue(new UserService(userRepository, idGenerator, protectPassword, imageSaver)),
  categoryService: asValue(new CathegoryService(categoryRepository)),
});

const authenticator = container.resolve('authenticator');

container.register({
  authService: asValue(new AuthService(userRepository, authenticator, protectPassword)),
});

export default container;
