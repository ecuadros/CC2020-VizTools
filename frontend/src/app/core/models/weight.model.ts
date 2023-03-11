export class DWeightModel {
  id!: number;
  min!: number;
  max!: number;
  programId!: number;
  dkaId!: number;

  constructor(init?: Partial<DWeightModel>) {
    Object.assign(this, init);
  }
}

export class PWeightModel {
  id!: number;
  value!: number;
  programId!: number;
  dkaId!: number;
  dkaName?: string;
  dkaIndex?: number;
  dkaDescription?: string;
  dkaFormattedIndex?: string;
  dkagFormattedName?: string;

  constructor(init?: Partial<PWeightModel>) {
    Object.assign(this, init);
  }
}
