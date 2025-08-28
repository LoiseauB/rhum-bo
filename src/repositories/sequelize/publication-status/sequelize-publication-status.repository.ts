import { Bottle } from '@/entities/bottle.entity';
import { Comment } from '@/entities/comment.entity';
import { PublicationStatus, PublicationStatusProps } from '@/entities/publication-status.entity';
import { IPublicationStatusRepository } from '@/interfaces/publication-status-repository.interface';
import BottleModel from '../bottle/sequelize-bottle.model';
import CommentModel from '../comments/sequelize-comment.model';
import PublicationStatusModel from './sequelize-publication-status.model';

class SequelizePublicationStatusRepository implements IPublicationStatusRepository {
  async create(publicationStatus: PublicationStatusProps): Promise<PublicationStatusProps> {
    const createdPublicationStatus = await PublicationStatusModel.create(publicationStatus);
    return createdPublicationStatus.toJSON();
  }

  async update(id: number, publicationStatus: Partial<PublicationStatusProps>): Promise<PublicationStatus | null> {
    const [updatedCount, updatedPublicationStatuses] = await PublicationStatusModel.update(publicationStatus, {
      where: { id },
      returning: true,
    });
    return updatedCount > 0 ? new PublicationStatus(updatedPublicationStatuses[0].toJSON()) : null;
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await PublicationStatusModel.destroy({ where: { id } });
    return deletedCount > 0;
  }

  async getAll(): Promise<PublicationStatus[]> {
    const publicationStatuses = await PublicationStatusModel.findAll();
    return publicationStatuses.map(publicationStatus => new PublicationStatus(publicationStatus.toJSON()));
  }

  async getById(id: number): Promise<PublicationStatus | null> {
    const publicationStatus = await PublicationStatusModel.findByPk(id);
    return publicationStatus ? new PublicationStatus(publicationStatus.toJSON()) : null;
  }

  async getComments(id: number): Promise<Comment[]> {
    const publicationStatus = await PublicationStatusModel.findByPk(id, {
      include: [{ model: CommentModel, as: 'comments' }],
    });
    return publicationStatus ? publicationStatus.comments.map(comment => new Comment(comment.toJSON())) : [];
  }

  async getBottles(id: number): Promise<Bottle[]> {
    const publicationStatus = await PublicationStatusModel.findByPk(id, {
      include: [{ model: BottleModel, as: 'bottles' }],
    });
    return publicationStatus ? publicationStatus.bottles.map(bottle => new Bottle(bottle.toJSON())) : [];
  }
}

export default SequelizePublicationStatusRepository;
