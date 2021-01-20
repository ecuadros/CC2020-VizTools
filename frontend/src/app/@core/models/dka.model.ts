export class DKA {
  id: number;
  name: string;
  index: number;
  dkagId: number;
  dkagIndex: number;

  constructor(init?: Partial<DKA>) {
    Object.assign(this, init);
  }

  get formatedName(): string {
    let prefix = 'C- ' + this.dkagIndex.toString() + '.' + this.index.toString();
    return prefix + ' ' + this.name;
  }

}