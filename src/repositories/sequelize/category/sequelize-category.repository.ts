import { CategoryProps } from '@/entities/category.entity';
import CategoryModel from './sequelize-category.model';

export default class SequelizeCategoryRepository {
  async create(category: CategoryProps): Promise<void> {
    await CategoryModel.create(category);
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
