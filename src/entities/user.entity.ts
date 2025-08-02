import { RolesEnum } from '@/enums/roles.enum';

export type UserProps = {
  id: string;
  email: string;
  password: string;
  pseudo: string;
  role: RolesEnum;
  avatar?: string;
};

export class User {
  constructor(public props: UserProps) {}
}
