export class InstitutionModel {
  id!: number;
  name!: string;
  acronym?: string;
  url?: string;
  countryId?: number;
  countryName?: string;
  programCount?: number;

  constructor(init?: Partial<InstitutionModel>) {
    Object.assign(this, init);
  }
}
