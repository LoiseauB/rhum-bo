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
    res.status(400).json({ message: error.message });
  }
};
