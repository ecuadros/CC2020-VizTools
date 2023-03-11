export class DKAGModel {
  id!: number;
  name!: string;
  index!: number;

  constructor(init?: Partial<DKAGModel>) {
    Object.assign(this, init);
  }

  get formattedName(): string {
    return `C-${this.index} ${this.name}`;
  }
}
