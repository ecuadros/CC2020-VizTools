import { CProgram, UProgram } from './program.model';

export enum SeriesType {
  Linear, RangeArea
}

export class ReducedSeries {
  id: number;
  color: string;

  constructor(id: number, color: string) {
    this.id = id;
    this.color = color;
  }
}

export class Series {
  id: string;
  originalId: number;
  universityId: number;
  name: string;
  type: SeriesType;
  color: string;
  data: any;

  constructor(program: CProgram | UProgram, data: any, color: string) {
    this.id = program.formatedId;
    this.originalId = program.id;
    this.name = program.formatedName;
    if (program instanceof CProgram) {
      this.type = SeriesType.RangeArea;
    }
    if (program instanceof UProgram) {
      this.type = SeriesType.Linear;
    }
    if (program instanceof UProgram) {
      this.universityId = program.universityId;
    } else {
      this.universityId = -1;
    }
    this.color = color;
    this.data = data;
  }

  get formatedType(): string {
    if (this.type === SeriesType.Linear) {
      return 'line';
    }
    if (this.type === SeriesType.RangeArea) {
      return 'rangeArea';
    }
    return '';
  }

}