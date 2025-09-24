import { IBottleCategoryRepository } from '@/interfaces/bottle-category-repository.interface';
import BottleCategoryModel from './sequelize-bottle-category.model';

export class SequelizeBottleCategoryRepository implements IBottleCategoryRepository {
  async create(bottleId: number, categoryId: number): Promise<void> {
    await BottleCategoryModel.create({
      bottle_id: bottleId,
      category_id: categoryId,
    });
  }

  async delete(bottleId: number, categoryId: number): Promise<void> {
    await BottleCategoryModel.destroy({ where: { bottleId, categoryId } });
  }
}
