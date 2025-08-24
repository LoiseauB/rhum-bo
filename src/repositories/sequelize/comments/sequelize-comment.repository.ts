import CommentModel from './sequelize-comment.model';
import { CommentProps } from '@/entities/comment.entity';

class CommentRepository {
  async create(comment: CommentProps): Promise<CommentProps> {
    const createdComment = await CommentModel.create(comment);
    return createdComment.toJSON();
  }

  async update(id: number, comment: Partial<CommentProps>): Promise<CommentProps | null> {
    const [updatedCount, updatedComments] = await CommentModel.update(comment, {
      where: { id },
      returning: true,
    });
    return updatedCount > 0 ? updatedComments[0].toJSON() : null;
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await CommentModel.destroy({
      where: { id },
    });
    return deletedCount > 0;
  }

  async getAll(): Promise<CommentProps[]> {
    const comments = await CommentModel.findAll();
    return comments.map(comment => comment.toJSON());
  }

  async getBottleComments(bottleId: number): Promise<CommentProps[]> {
    const comments = await CommentModel.findAll({
      where: { bottleId },
    });
    return comments.map(comment => comment.toJSON());
  }

  async getUserComments(userId: string): Promise<CommentProps[]> {
    const comments = await CommentModel.findAll({
      where: { userId },
    });
    return comments.map(comment => comment.toJSON());
  }
}

export default new CommentRepository();
