import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TableService } from './table.service';
import { CProgram, UProgram, Series, ReducedSeries } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ShareGraphService {

  private onCompleteSource = new Subject<void>();
  
  onComplete$ = this.onCompleteSource.asObservable();

  constructor(
    private tableService: TableService
  ) { }

  importGraph(encodedData: string, cProgramsSeries: Series[], uProgramsSeries: Series[]): void {
    let decodedData = JSON.parse(decodeURIComponent(encodedData));
    let cProgramsData: ReducedSeries[] = decodedData[0];
    let uProgramsData: ReducedSeries[] = decodedData[1];
    let cProgramIDs: number[] = [];
    let uProgramIDs: number[] = [];
    let observables: Observable<any>[] = [];

    for (let cProgram of cProgramsData) {
      cProgramIDs.push(cProgram.id);
    }
    for (let uProgram of uProgramsData) {
      uProgramIDs.push(uProgram.id);
    }

    observables.push(this.tableService.readByNCProgramsComplete(cProgramIDs));
    observables.push(this.tableService.readByNUProgramsComplete(uProgramIDs));

    forkJoin(observables).subscribe(
      ([cPrograms, uPrograms]) => {
        let serie, color;
        for (let cProgram of <CProgram[]>cPrograms) {
          color = cProgramsData.find(program => program.id == cProgram.id).color;
          serie = new Series(cProgram, cProgram.weights, color);
          cProgramsSeries.push(serie);
        }
        for (let uProgram of <UProgram[]>uPrograms) {
          color = uProgramsData.find(program => program.id == uProgram.id).color;
          serie = new Series(uProgram, uProgram.weights, color);
          uProgramsSeries.push(serie);
        }
        this.onCompleteSource.next();
      }
    );
  }

  exportGraph(cProgramsSeries: Series[], uProgramsSeries: Series[]): string {
    let cProgramsData: ReducedSeries[] = [];
    let uProgramsData: ReducedSeries[] = [];
    let encodedData: string;

    for (let programSeries of cProgramsSeries) {
      cProgramsData.push(new ReducedSeries(programSeries.originalId, programSeries.color));
    }

    for (let programSeries of uProgramsSeries) {
      uProgramsData.push(new ReducedSeries(programSeries.originalId, programSeries.color));
    }

    encodedData = encodeURIComponent(JSON.stringify([cProgramsData, uProgramsData]));

    return environment.FrontEndpoint + '/compare-tool?data=' + encodedData;
  }

}
