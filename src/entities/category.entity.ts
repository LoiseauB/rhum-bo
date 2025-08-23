export type CategoryProps = {
  id: number;
  label: string;
};

export class Category {
  constructor(public props: CategoryProps) {}
}
