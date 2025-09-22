import { Bottle } from '@/entities/bottle.entity';
import { IBottleCategoryRepository } from '@/interfaces/bottle-category-repository.interface';
import { BottleWithDetails, IBottleRepository } from '@/interfaces/bottle-repository.interface';
import { IImageSaver } from '@/interfaces/image-saver.interface';
import { awsFolderNames } from '@/utils/awsFolders';

export type BottlePayload = {
  name: string;
  description: string;
  image?: Buffer;
  countryId: number;
  categories: number[];
};

export class BottleService {
  constructor(
    private readonly bottleRepository: IBottleRepository,
    private readonly bottleCategoryRepository: IBottleCategoryRepository,
    private readonly imageSaver: IImageSaver,
  ) {}

  async createBottle({ name, description, image, countryId, categories }: BottlePayload): Promise<void> {
    let imageUrl: string | undefined;
    try {
      if (!image) throw new Error('Image is required');
      imageUrl = await this.imageSaver.uploadImage(name.replace(' ', '-'), image, awsFolderNames.bottles);
      const bottle = await this.bottleRepository.create(
        new Bottle({ name, description, imageUrl, countryId, publicationStatusId: 0 }),
      );
      for (const category of categories) {
        await this.bottleCategoryRepository.create(bottle.props.id!, category);
      }
    } catch (error) {
      if (imageUrl) {
        await this.imageSaver.deleteImage(name.replace(' ', '-'), awsFolderNames.bottles);
      }
      throw error;
    }
  }

  async updateBottle(id: number, { name, description, image, countryId, categories }: BottlePayload): Promise<void> {
    let imageUrl: string | undefined;
    try {
      const bottle = await this.bottleRepository.findById(id);
      if (!bottle) throw new Error('Bottle not found');
      if (image) {
        await this.imageSaver.deleteImage(bottle.props.name.replace(' ', '-'), awsFolderNames.bottles);
        imageUrl = await this.imageSaver.uploadImage(name.replace(' ', '-'), image, awsFolderNames.bottles);
      }

      bottle.props = {
        ...bottle.props,
        name,
        description,
        imageUrl: imageUrl || bottle.props.imageUrl,
        countryId,
      };

      await this.bottleRepository.update(bottle);

      const bottleCategories = await this.bottleRepository.getCategories(id);

      for (const category of bottleCategories) {
        await this.bottleCategoryRepository.delete(id, category.props.id);
      }
      for (const category of categories) {
        await this.bottleCategoryRepository.create(id, category);
      }
    } catch (error) {
      if (imageUrl) {
        await this.imageSaver.deleteImage(name.replace(' ', '-'), awsFolderNames.bottles);
      }
      throw error;
    }
  }
  async deleteBottle(id: number): Promise<void> {
    const bottle = await this.bottleRepository.findById(id);
    if (!bottle) throw new Error('Bottle not found');

    await this.imageSaver.deleteImage(bottle.props.name.replace(' ', '-'), awsFolderNames.bottles);
    await this.bottleRepository.delete(id);
  }

  async getBottle(id: number): Promise<BottleWithDetails> {
    const bottle = await this.bottleRepository.findByIdWithDetails(id);
    if (!bottle) throw new Error('Bottle not found');
    return bottle;
  }

  async searchBottles(query: string): Promise<Bottle[]> {
    const bottles = await this.bottleRepository.findByName(query);
    if (!bottles || bottles?.length === 0) throw new Error('Bottle not found');
    return bottles;
  }

  async indexBottles(): Promise<Bottle[]> {
    return await this.bottleRepository.findAll();
  }
}
