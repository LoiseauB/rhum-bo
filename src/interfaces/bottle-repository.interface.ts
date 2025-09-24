import { Bottle, BottleProps } from '@/entities/bottle.entity';
import { Category } from '@/entities/category.entity';

export type BottleWithDetails = BottleProps & {
  comments: Array<{
    id: number;
    text: string;
    userId: number;
    updatedAt: Date;
    users: {
      pseudo: string;
      avatar: string;
    };
  }>;
  avgRating: number;
  categories: string[];
};
export interface IBottleRepository {
  create(bottle: Bottle): Promise<Bottle>;
  update(bottle: Bottle): Promise<void>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Bottle | null>;
  findByIdWithDetails(id: number): Promise<BottleWithDetails | null>;
  findByName(name: string): Promise<Bottle[]>;
  findAll(): Promise<Bottle[]>;
  getCategories(id: number): Promise<Category[]>;
  getBottlesByCountryId(countryId: number): Promise<Bottle[]>;
}
