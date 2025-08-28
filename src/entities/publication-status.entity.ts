export type PublicationStatusProps = {
  id: number;
  label: string;
};

export class PublicationStatus {
  constructor(public props: PublicationStatusProps) {}
}
