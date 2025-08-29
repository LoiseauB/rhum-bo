export interface IFavoriteRepository {
  create(bottleId: number, userId: string): Promise<void>;
  delete(bottleId: number, userId: string): Promise<void>;
}
