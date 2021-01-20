export class DKAG {
  id: number;
  name: string;
  index: number;

  constructor(init?: Partial<DKAG>) {
    Object.assign(this, init);
  }

}