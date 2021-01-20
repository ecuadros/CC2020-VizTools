import { CWeight, UWeight } from './weight.model';

export class CProgram {
  id: number;
  name: string;
  acronym: string;
  weights?: CWeight[];

  constructor(init?: Partial<CProgram>) {
    Object.assign(this, init);
  }

  get formatedId(): string {
    return CProgram.name + '-' + this.id.toString();
  }

  get formatedName(): string {
    return 'CC2020 - ' + this.name;
  }

}

export class UProgram {
  id: number;
  name: string;
  acronym: string;
  universityId: number;
  universityName: string;
  countryName: string;
  programId: number;
  weights?: UWeight[];

  constructor(init?: Partial<UProgram>) {
    Object.assign(this, init);
  }

  get formatedId(): string {
    return UProgram.name + '-' + this.id.toString();
  }

  get formatedName(): string {
    let prefix = this.countryName + ' - ' + this.universityName;
    return prefix +  ' - ' + this.name;
  }

}