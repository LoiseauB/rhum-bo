export type CommentProps = {
  id: number;
  bottleId: number;
  userId: string;
  publicationStatusId: number;
  text: string;
};

export class Comment {
  constructor(public props: CommentProps) {}
}
