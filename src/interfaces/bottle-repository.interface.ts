import { Bottle } from '@/entities/bottle.entity';
import { Category } from '@/entities/category.entity';

export interface IBottleRepository {
  create(bottle: Bottle): Promise<void>;
  update(bottle: Bottle): Promise<void>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Bottle | null>;
  findByName(name: string): Promise<Bottle[] | null>;
  findAll(): Promise<Bottle[]>;
  getCategories(id: number): Promise<Category[]>;
  getBottlesByCountryId(countryId: number): Promise<Bottle[]>;
}
