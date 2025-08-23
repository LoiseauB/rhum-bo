export type BottleProps = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

export class Bottle {
  constructor(public props: BottleProps) {}
}
