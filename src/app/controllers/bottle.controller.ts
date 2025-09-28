import { Request, Response } from 'express';
import container from '../config/dependency-injection';

export const createBottle = async (req: Request, res: Response) => {
  try {
    const { name, description, categories, countryId } = req.body;
    await container.resolve('bottleService').createBottle({
      name,
      description,
      categories,
      countryId,
      image: { buffer: req.file?.buffer, originalname: req.file?.filename },
    });
    res.status(201).json({ message: 'Bottle created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchBottle = async (req: Request, res: Response) => {
  const image = req.file;
  let bottleName = req.body.search;
  try {
    if (image) {
      bottleName = await container
        .resolve('ocrService')
        .extractTextFromImage({ buffer: image.buffer, mimeType: image.mimetype });
    }
    const bottles = await container.resolve('bottleService').searchBottles(bottleName);
    if (bottles.length === 0) {
      res.status(404).json({ message: 'Bottles not found' });
    }
    res.status(200).json({ message: 'Bottle(s) found', data: bottles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBottleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const bottle = await container.resolve('bottleService').getBottle(Number(id));
    if (!bottle) {
      res.status(404).json({ message: 'Bottles not found' });
    }
    res.status(200).json({ message: 'Bottle found', data: bottle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
