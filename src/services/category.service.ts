import { CategoryProps } from '@/entities/category.entity';
import { ICategoryRepository } from '@/interfaces/category-repository.interface';

export default class CategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async create(label: string): Promise<void> {
    await this.categoryRepository.create(label);
  }

  async findAll(): Promise<CategoryProps[]> {
    return await this.categoryRepository.findAll();
  }

  async findById(id: number): Promise<CategoryProps | null> {
    return await this.categoryRepository.findById(id);
  }

  async update(id: number, category: Partial<CategoryProps>): Promise<void> {
    await this.categoryRepository.update(id, category);
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
