import { Component, Input, OnInit } from '@angular/core';
import { DKAModel } from '@core/models';
import { SeriesModel } from '@core/models';
import { DKAFacade } from '@facades/dka.facade';
import { BehaviorSubject, map, mergeMap, Observable } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input()
  title: string = '';

  @Input()
  series$!: BehaviorSubject<SeriesModel[]>;

  dataSource: any[] = [];

  dkas$: Observable<DKAModel[]>;

  constructor(private readonly dkaFacade: DKAFacade) {
    this.dkas$ = this.dkaFacade.selectDKAs();
  }

  ngOnInit(): void {
    let updateDataSource$ = this.dkas$.pipe(
      mergeMap((dkas: DKAModel[]) => this.series$.pipe(
        map((series: SeriesModel[]) => {
          let dataSource: any[] = [];
          dkas.forEach(dka => {
            let newXaxis: any = {};
            newXaxis['label'] = new DKAModel(dka).formattedName;
            series.forEach(serie => {
              let weight = serie.weights.find((weight: any) => weight.dkaId === dka.id);
              if (weight && serie.type === 'rangeArea') {
                newXaxis[serie.min] = weight.min;
                newXaxis[serie.max] = weight.max;
              }
              if (weight && serie.type === 'line') {
                newXaxis[serie.value] = weight.value;
              }
            });
            dataSource.push(newXaxis);
          });
          dataSource.sort((a, b) => a.label.localeCompare(b.label));
          return dataSource;
        })
      )),
    );
    updateDataSource$.subscribe(dataSource => {
      this.dataSource = dataSource;
    });
  }

  showSeriesName(arg: any): any {
    return { text: arg.seriesName };
  }

}
