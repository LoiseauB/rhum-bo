import { IFavoriteRepository } from '@/interfaces/favorite-repository.interface';
import FavoriteModel from './sequelize-favorite.model';

export class SequelizeFavoriteRepository implements IFavoriteRepository {
  async create(bottleId: number, userId: string): Promise<void> {
    await FavoriteModel.create({ bottleId, userId });
  }

  async delete(bottleId: number, userId: string): Promise<void> {
    await FavoriteModel.destroy({ where: { bottleId, userId } });
  }
}
