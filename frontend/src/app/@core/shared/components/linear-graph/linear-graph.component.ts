import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Series, SeriesType } from '../../../models/serie.model';

@Component({
  selector: 'app-linear-graph',
  templateUrl: './linear-graph.component.html',
  styleUrls: ['./linear-graph.component.scss']
})
export class LinearGraphComponent implements OnInit, OnChanges {

  @Input() title: string = '';

  @Input() series: Series[] = [];

  @Input() yAxis: string = '';

  @Input() xAxis: any[] = [];

  @Input() xAxisExpr: string = '';

  options?: any = {};

  realData: any[] = [];

  realSeries: any[] = [];

  wholeRange: any[] = [0, 5]

  visualRange: any[] = [0, 5];

  constructor() { }

  ngOnInit(): void {
    this.transformSeries();
  }

  ngOnChanges(): void {
    this.visualRange = [0, 0];
    this.transformSeries();
    this.visualRange = [0, 5];
  }

  private transformSeries(): void {
    let newXAxis: any;
    let serieItem: any;

    let newData = [];
    let newSeries = [];

    for (let serie of this.series) {
      newSeries.push({
        name: serie.name,
        type: serie.formatedType,
        value: serie.id + 'value',
        min: serie.id + 'rangeMin',
        max: serie.id + 'rangeMax',
        color: serie.color,
      })
    }

    for (let xAxisItem of this.xAxis) {
      newXAxis = {}
      newXAxis['label'] = xAxisItem[this.xAxisExpr];
      for (let serie of this.series) {
        serieItem = serie.data.find(item => item[this.yAxis] == xAxisItem.id)

        if (serieItem == undefined) continue;

        if (serie.type == SeriesType.Linear) {
          newXAxis[serie.id + 'value'] = serieItem.value
        }

        if (serie.type == SeriesType.RangeArea) {
          newXAxis[serie.id + 'rangeMin'] = serieItem.min
          newXAxis[serie.id + 'rangeMax'] = serieItem.max
        }
      }
      newData.push(newXAxis);
    }

    this.realData = newData;
    this.realSeries = newSeries;
  }

  showSeriesName(arg): any {
    return { text: arg.seriesName };
  }

}
