import { Bottle } from '@/entities/bottle.entity';
import { Category } from '@/entities/category.entity';
import { IBottleRepository } from '@/interfaces/bottle-repository.interface';
import BottleModel from './sequelize-bottle.model';

export class SequelizeBottleRepository implements IBottleRepository {
  async create(bottle: Bottle): Promise<void> {
    await BottleModel.create(bottle.props);
  }

  async update(bottle: Bottle): Promise<void> {
    await BottleModel.update(bottle.props, {
      where: {
        id: bottle.props.id,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await BottleModel.destroy({
      where: {
        id,
      },
    });
  }

  async findById(id: number): Promise<Bottle | null> {
    const bottle = await BottleModel.findByPk(id);
    return bottle ? new Bottle(bottle.toJSON()) : null;
  }

  async findByName(name: string): Promise<Bottle[] | null> {
    const bottle = await BottleModel.findAll({
      where: {
        name,
      },
    });
    return bottle ? bottle.map(bottle => new Bottle(bottle.toJSON())) : null;
  }

  async findAll(): Promise<Bottle[]> {
    const bottle = await BottleModel.findAll();
    return bottle.map(bottle => new Bottle(bottle.toJSON()));
  }

  async getCategories(id: number): Promise<Category[]> {
    const bottle = await BottleModel.findByPk(id);
    return bottle ? bottle.getCategories().map(category => new Category(category.toJSON())) : [];
  }
}
