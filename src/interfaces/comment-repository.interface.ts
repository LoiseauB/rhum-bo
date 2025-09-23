import { CommentProps } from '@/entities/comment.entity';

export interface ICommentRepository {
  create(comment: CommentProps): Promise<CommentProps>;
  update(id: number, comment: Partial<CommentProps>): Promise<CommentProps | null>;
  delete(id: number): Promise<boolean>;
  getAll(): Promise<CommentProps[]>;
  getBottleComments(bottleId: number): Promise<CommentProps[]>;
  getUserComments(userId: string): Promise<CommentProps[]>;
}
