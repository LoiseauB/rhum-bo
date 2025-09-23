import { RateProps } from '@/entities/rate.entity';
import RateModel from './sequelize-rate.model';

class RateRepository {
  async create(rate: RateProps): Promise<RateProps> {
    const createdRate = await RateModel.create(rate);
    return createdRate.toJSON();
  }

  async update(userId: number, bottleId: number, rate: number): Promise<RateProps> {
    const [updatedCount, updatedRates] = await RateModel.update(
      { rate },
      {
        where: { userId, bottleId },
        returning: true,
      },
    );
    if (updatedCount === 0) {
      throw new Error('Rate not found');
    }
    return updatedRates[0].toJSON();
  }

  async delete(userId: number, bottleId: number): Promise<void> {
    const deletedCount = await RateModel.destroy({
      where: { userId, bottleId },
    });
    if (deletedCount === 0) {
      throw new Error('Rate not found');
    }
  }
}

export default new RateRepository();
