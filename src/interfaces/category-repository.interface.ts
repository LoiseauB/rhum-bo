import { CategoryProps } from '@/entities/category.entity';

export interface ICategoryRepository {
  create(category: CategoryProps): Promise<void>;
  findAll(): Promise<CategoryProps[]>;
  findById(id: number): Promise<CategoryProps | null>;
  update(id: number, category: Partial<CategoryProps>): Promise<void>;
  delete(id: number): Promise<void>;
}
