export interface IBottleCategoryRepository {
  create(bottleId: number, categoryId: number): Promise<void>;
  delete(bottleId: number, categoryId: number): Promise<void>;
}
