import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { CProgram } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CProgramService {

  static path = environment.APIEndpoint + '/program/';

  constructor(private http: HttpClient) { }

  create(item: CProgram): Observable<CProgram> {
    const path = CProgramService.path;
    return this.http.post<CProgram>(path, item).pipe(
      map(item => new CProgram(item))
    );
  }

  read(id: number): Observable<CProgram> {
    const path = CProgramService.path;
    return this.http.get<CProgram>(path + id.toString()).pipe(
      map(item => new CProgram(item))
    );
  }

  readAll(): Observable<CProgram[]> {
    const path = CProgramService.path;
    return this.http.get<CProgram[]>(path).pipe(
      map(items => items.map(item => new CProgram(item)))
    );
  }

  update(id: number, item: any): Observable<CProgram> {
    const path = CProgramService.path;
    return this.http.put<CProgram>(path + id.toString(), item).pipe(
      map(item => new CProgram(item))
    );
  }

  delete(id: number): Observable<void> {
    const path = CProgramService.path;
    return this.http.delete<void>(path + id.toString());
  }

}
