import { DWeightModel } from '.';

export class DisciplineModel {
  id!: number;
  name!: string;
  acronym!: string;
  weights: DWeightModel[] = [];
  color?: string;

  constructor(init?: Partial<DisciplineModel>) {
    Object.assign(this, init);
  }

  get formattedId(): string {
    return this.name + '-' + this.id.toString();
  }

  get formattedName(): string {
    return 'CC2020 - ' + this.name;
  }
}
