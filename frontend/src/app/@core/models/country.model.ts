export class Country {
  id: number;
  name: string;
  acronym: number;

  constructor(init?: Partial<Country>) {
    Object.assign(this, init);
  }
}