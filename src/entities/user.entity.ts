export type UserProps = {
  id: number;
  email: string;
  password: string;
  pseudo: string;
  role: string;
  avatar?: string;
};

export class User {
  constructor(public props: UserProps) {}
}
