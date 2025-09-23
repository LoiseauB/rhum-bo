export type CountryProps = {
  id: number;
  name: string;
};

export class Country {
  constructor(public props: CountryProps) {}
}
