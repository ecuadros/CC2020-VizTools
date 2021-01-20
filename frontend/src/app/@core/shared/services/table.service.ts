import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { CProgram, CWeight, UProgram, UWeight } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  static path = environment.APIEndpoint + '/table/';

  constructor(private http: HttpClient) { }

  readByCProgram(programId: number): Observable<CWeight[]> {
    const path = TableService.path + 'program/';
    return this.http.get<CWeight[]>(path + programId.toString()).pipe(
      map(items => items.map(item => new CWeight(item)))
    );
  }

  readByNCPrograms(programIds: number[]): Observable<CWeight[][]> {
    const path = TableService.path + 'program';
    return this.http.post<CWeight[][]>(path, programIds).pipe(
      map(items => items.map(item => item.map(subitem => new CWeight(subitem))))
    );
  }

  readByNCProgramsComplete(programIds: number[]): Observable<CProgram[]> {
    const path = TableService.path + 'program/complete';
    return this.http.post<CProgram[]>(path, programIds).pipe(
      map(items => items.map(item => new CProgram(item)))
    );
  }

  updateCWeight(dkaId: number, programId: number, item: CWeight): Observable<CWeight> {
    const path = TableService.path + 'program/' + dkaId.toString() + '/';
    return this.http.put<CWeight>(path + programId.toString(), item).pipe(
      map(item => new CWeight(item))
    );
  }

  readByUProgram(programId: number): Observable<UWeight[]> {
    const path = TableService.path + 'uprogram/';
    return this.http.get<UWeight[]>(path + programId.toString()).pipe(
      map(items => items.map(item => new UWeight(item)))
    );
  }

  readByNUPrograms(programIds: number[]): Observable<UWeight[][]>{
    const path = TableService.path + 'uprogram';
    return this.http.post<UWeight[][]>(path, programIds).pipe(
      map(items => items.map(item => item.map(subitem => new UWeight(subitem))))
    );
  }

  readByNUProgramsComplete(programIds: number[]): Observable<UProgram[]>{
    const path = TableService.path + 'uprogram/complete';
    return this.http.post<UProgram[]>(path, programIds).pipe(
      map(items => items.map(item => new UProgram(item)))
    );
  }

  updateUWeight(id: number, item: UWeight): Observable<UWeight> {
    const path = TableService.path + 'uprogram/';
    return this.http.put<UWeight>(path + id.toString(), item).pipe(
      map(item => new UWeight(item))
    );
  }

}
