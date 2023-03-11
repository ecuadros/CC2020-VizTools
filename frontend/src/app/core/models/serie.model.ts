import { DisciplineModel } from "./discipline.model";
import { ProgramModel } from "./program.model";

export class ReducedSeriesModel {
  id: number;
  color: string;

  constructor(id: number, color: string) {
    this.id = id;
    this.color = color;
  }
}

export class SeriesModel {
  id: string;
  name: string;
  type!: string;
  color: string;
  value!: string;
  min!: string;
  max!: string;
  weights: any[];

  constructor(data: ProgramModel | DisciplineModel, color: string) {
    this.id = data.formattedId;
    this.name = data.formattedName;
    if (data instanceof ProgramModel) {
      this.type = 'line';
      this.value = this.id + '-value';
    }
    if (data instanceof DisciplineModel) {
      this.type = 'rangeArea';
      this.min = this.id + '-min';
      this.max = this.id + '-max';
    }
    this.color = color;
    this.weights = data.weights;
  }

}
