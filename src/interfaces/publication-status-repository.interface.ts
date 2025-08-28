import { Bottle } from '@/entities/bottle.entity';
import { Comment } from '@/entities/comment.entity';
import { PublicationStatus, PublicationStatusProps } from '@/entities/publication-status.entity';

export interface IPublicationStatusRepository {
  create(publicationStatus: PublicationStatusProps): Promise<PublicationStatusProps>;
  update(id: number, publicationStatus: Partial<PublicationStatusProps>): Promise<PublicationStatus | null>;
  delete(id: number): Promise<boolean>;
  getAll(): Promise<PublicationStatus[]>;
  getById(id: number): Promise<PublicationStatus | null>;
  getComments(id: number): Promise<Comment[]>;
  getBottles(id: number): Promise<Bottle[]>;
}
