export class DKAModel {
  id!: number;
  name!: string;
  index!: number;
  description?: string;
  dkagId!: number;
  dkagIndex!: number;

  constructor(init?: Partial<DKAModel>) {
    Object.assign(this, init);
  }

  get formattedIndex(): string {
    return `C-${this.dkagIndex}.${this.index}`;
  }

  get formattedName(): string {
    return `${this.formattedIndex} ${this.name}`;
  }
}
