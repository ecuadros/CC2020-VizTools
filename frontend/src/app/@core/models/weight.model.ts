export class CWeight {
  id: number;
  max: number;
  min: number;
  dkaId: number;
  dkaIndex: number;
  dkaTitle: string;
  dkagId: number;
  dkagIndex: number;
  dkagTitle: string;
  programId: number;
  programTitle: string;

  constructor(init?: Partial<CWeight>) {
    Object.assign(this, init);
  }

  get formatedDKAGTitle(): string {
    return 'C-' + this.dkagIndex.toString() + ' ' + this.dkagTitle;
  }

  get DKAPrefix() {
    return 'C-' + this.dkagIndex.toString() + '.' + this.dkaIndex.toString();;
  }

}

export class UWeight {
  id: number;
  value: number;
  dkaId: number;
  dkaIndex: number;
  dkaTitle: string;
  dkagId: number;
  dkagIndex: number;
  dkagTitle: string;
  programId: number;
  programTitle: string;

  constructor(init?: Partial<UWeight>) {
    Object.assign(this, init);
  }

  get formatedDKAGTitle(): string {
    return 'C-' + this.dkagIndex.toString() + ' ' + this.dkagTitle;
  }

  get DKAPrefix() {
    return 'C-' + this.dkagIndex.toString() + '.' + this.dkaIndex.toString();;
  }

}
