import { Bottle } from '@/entities/bottle.entity';
import { Category } from '@/entities/category.entity';
import { BottleWithDetails, IBottleRepository } from '@/interfaces/bottle-repository.interface';
import { sequelize } from '@/utils/connectDB';
import { Op } from 'sequelize';
import CategoryModel from '../category/sequelize-category.model';
import CommentModel from '../comments/sequelize-comment.model';
import RateModel from '../rate/sequelize-rate.model';
import UserModel from '../user/sequelize-user.model';
import BottleModel from './sequelize-bottle.model';
import CountryModel from '../country/sequelize-country.model';

export class SequelizeBottleRepository implements IBottleRepository {
  async create(bottle: Bottle): Promise<Bottle> {
    const savedBottle = await BottleModel.create(bottle.props);
    return new Bottle(savedBottle.toJSON());
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

  async findByIdWithDetails(id: number): Promise<BottleWithDetails | null> {
    const bottle = (await BottleModel.findOne({
      where: { id },
      include: [
        {
          model: CategoryModel,
          as: 'Categories',
          attributes: ['label'],
        },
        {
          model: CountryModel,
          as: 'country',
          attributes: ['name'],
        },
        {
          model: RateModel,
          as: 'rates',
          attributes: [],
          required: false,
        },
        {
          model: CommentModel,
          as: 'comments',
          attributes: ['id', 'text', 'userId', 'updatedAt'],
          required: false,
          include: [
            {
              model: UserModel,
              as: 'user',
              attributes: ['pseudo', 'avatar'],
            },
          ],
        },
      ],
      attributes: {
        include: [[sequelize.literal('ROUND(AVG(rates.rate), 0)'), 'avgRating']],
      },
      group: ['Bottle.id', 'comments.id', 'Categories.label'],
    })) as unknown as BottleWithDetails;
    return bottle ? bottle : null;
  }

  async findByName(name: string): Promise<Bottle[]> {
    if (!name.trim()) {
      return [];
    }

    const keywords = name.split(' ').filter(word => word.length > 0);
    const conditions = keywords.map(keyword => ({
      name: {
        [Op.like]: `%${keyword}%`,
      },
    }));

    const bottles = await BottleModel.findAll({
      where: {
        [Op.and]: conditions,
      },
    });

    return bottles.length > 0 ? bottles.map(bottle => new Bottle(bottle.toJSON())) : [];
  }

  async findAll(): Promise<Bottle[]> {
    const bottle = await BottleModel.findAll();
    return bottle.map(bottle => new Bottle(bottle.toJSON()));
  }

  async getCategories(id: number): Promise<Category[]> {
    const bottle = await BottleModel.findByPk(id);
    return bottle ? bottle.getCategories().map(category => new Category(category.toJSON())) : [];
  }

  async getBottlesByCountryId(countryId: number): Promise<Bottle[]> {
    const bottles = await BottleModel.findAll({
      where: { countryId },
    });
    return bottles.map(bottle => new Bottle(bottle.toJSON()));
  }
}
