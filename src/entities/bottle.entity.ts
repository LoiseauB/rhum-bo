export type BottleProps = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  country_id: number;
  publicationStatusId: number;
};

export class Bottle {
  constructor(public props: BottleProps) {}
}
