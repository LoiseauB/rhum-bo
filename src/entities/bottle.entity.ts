export type BottleProps = {
  id?: number;
  name: string;
  description: string;
  imageUrl: string;
  countryId: number;
  publicationStatusId: number;
};

export class Bottle {
  constructor(public props: BottleProps) {}
}
