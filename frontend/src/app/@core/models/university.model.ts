export class University {
  id: number;
  name: string;
  acronym: string;
  url: string;
  countryId: number;
  countryName: string;

  constructor(init?: Partial<University>) {
    Object.assign(this, init);
  }

}
