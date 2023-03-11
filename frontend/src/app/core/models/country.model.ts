export class CountryModel {
  id!: number;
  name!: string;
  acronym!: string;
  institutionCount?: number;
  programCount?: number;

  constructor(init?: Partial<CountryModel>) {
    Object.assign(this, init);
  }
}
