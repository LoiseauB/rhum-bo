export type RateProps = {
  userId: string;
  bottleId: number;
  rate: number;
};

export class Rate {
  constructor(public props: RateProps) {}
}
