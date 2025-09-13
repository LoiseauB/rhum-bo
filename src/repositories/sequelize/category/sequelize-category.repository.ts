import { CategoryProps } from '@/entities/category.entity';
import { ICategoryRepository } from '@/interfaces/category-repository.interface';
import CategoryModel from './sequelize-category.model';

export default class SequelizeCategoryRepository implements ICategoryRepository {
  async create(label: string): Promise<void> {
    await CategoryModel.create({ label });
  }

  async findAll(): Promise<CategoryProps[]> {
    const categories = await CategoryModel.findAll();
    return categories.map(category => category.toJSON());
  }

  async findById(id: number): Promise<CategoryProps | null> {
    const category = await CategoryModel.findByPk(id);
    return category ? category.toJSON() : null;
  }

  async update(id: number, category: Partial<CategoryProps>): Promise<void> {
    await CategoryModel.update(category, {
      where: { id },
    });
  }

  async delete(id: number): Promise<void> {
    await CategoryModel.destroy({
      where: { id },
    });
  }
}
