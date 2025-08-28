import { IBottleRepository } from '@/interfaces/bottle-repository.interface';
import { ICommentRepository } from '@/interfaces/comment-repository.interface';
import { ICountryRepository } from '@/interfaces/country-repository.interface';
import { IImageSaver } from '@/interfaces/image-saver.interface';
import { IProtectPassword } from '@/interfaces/protect-password.interface';
import { IPublicationStatusRepository } from '@/interfaces/publication-status-repository.interface';
import { SequelizeBottleRepository } from '@/repositories/sequelize/bottle/sequelize-bottle.repository';
import SequelizeCategoryRepository from '@/repositories/sequelize/category/sequelize-category.repository';
import SequelizePublicationStatusRepository from '@/repositories/sequelize/publication-status/sequelize-publication-status.repository';
import SequelizeUserRepository from '@/repositories/sequelize/user/sequelize-user.repository';
import AuthService from '@/services/auth.service';
import CathegoryService from '@/services/category.service';
import S3Service from '@/services/s3.service';
import UserService from '@/services/user.service';
import { JwtAuthenticator } from '@/utils/jwt-authentificator';
import ProtectPassword from '@/utils/protectPassword';
import { s3Client } from '@/utils/s3Client';
import { asClass, asValue, createContainer } from 'awilix';
import { IAuthenticator } from '../../interfaces/authenticator.interface';
import { IIDGenerator } from '../../interfaces/id-generator.interface';
import { UUIDGenerator } from '../../utils/uuid-generator';
import { SequelizeCommentRepository } from '@/repositories/sequelize/comments/sequelize-comment.repository';
import { SequelizeCountryRepository } from '@/repositories/sequelize/country/sequelize-country.repository';

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
  bottleRepository: IBottleRepository;
  commentRepository: ICommentRepository;
  countryRepository: ICountryRepository;
  publicationStatusRepository: IPublicationStatusRepository;
}

const container = createContainer<Dependencies>();

container.register({
  userRepository: asValue(new SequelizeUserRepository()),
  idGenerator: asClass(UUIDGenerator).singleton(),
  protectPassword: asClass(ProtectPassword).singleton(),
  imageSaver: asValue(new S3Service(s3Client)),
  categoryRepository: asValue(new SequelizeCategoryRepository()),
  bottleRepository: asValue(new SequelizeBottleRepository()),
  commentRepository: asValue(new SequelizeCommentRepository()),
  countryRepository: asValue(new SequelizeCountryRepository()),
  publicationStatusRepository: asValue(new SequelizePublicationStatusRepository()),
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
