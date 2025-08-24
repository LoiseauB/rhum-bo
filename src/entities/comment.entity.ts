export type CommentProps = {
  id: number;
  bottleId: number;
  userId: string;
  text: string;
};

export class Comment {
  constructor(public props: CommentProps) {}
}
