import { PWeightModel } from '.';

export class ProgramModel {
  id!: number;
  name!: string;
  nativeName?: string;
  acronym?: string;
  institutionId!: number;
  institutionAcronym!: string;
  countryId!: number;
  countryAcronym!: string;
  disciplineId!: number;
  weights: PWeightModel[] = [];
  color?: string;

  constructor(init?: Partial<ProgramModel>) {
    Object.assign(this, init);
  }

  get formattedId(): string {
    return this.name + '-' + this.id.toString();
  }

  get formattedName(): string {
    let prefix = this.countryAcronym + ' - ' + this.institutionAcronym;
    return prefix + ' - ' + this.name;
  }
}
