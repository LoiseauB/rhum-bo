import { PublicationStatus, PublicationStatusProps } from '@/entities/publication-status.entity';
import { IPublicationStatusRepository } from '@/interfaces/publication-status-repository.interface';
import { Comment } from '@/entities/comment.entity';
import { Bottle } from '@/entities/bottle.entity';

class PublicationStatusService {
  constructor(private publicationStatusRepository: IPublicationStatusRepository) {}

  async create(publicationStatus: PublicationStatusProps): Promise<PublicationStatusProps> {
    return this.publicationStatusRepository.create(publicationStatus);
  }

  async update(id: number, publicationStatus: Partial<PublicationStatusProps>): Promise<PublicationStatus | null> {
    return this.publicationStatusRepository.update(id, publicationStatus);
  }

  async delete(id: number): Promise<boolean> {
    return this.publicationStatusRepository.delete(id);
  }

  async getAll(): Promise<PublicationStatus[]> {
    return this.publicationStatusRepository.getAll();
  }

  async getById(id: number): Promise<PublicationStatus | null> {
    return this.publicationStatusRepository.getById(id);
  }

  async getComments(id: number): Promise<Comment[]> {
    return this.publicationStatusRepository.getComments(id);
  }

  async getBottles(id: number): Promise<Bottle[]> {
    return this.publicationStatusRepository.getBottles(id);
  }
}

export default PublicationStatusService;
