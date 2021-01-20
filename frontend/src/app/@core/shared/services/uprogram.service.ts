import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { UProgram } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UProgramService {

  static path = environment.APIEndpoint + '/uprogram/';

  constructor(private http: HttpClient) { }

  create(item: UProgram): Observable<UProgram> {
    const path = UProgramService.path;
    return this.http.post<UProgram>(path, item).pipe(
      map(item => new UProgram(item))
    );
  }

  read(id: number): Observable<UProgram> {
    const path = UProgramService.path;
    return this.http.get<UProgram>(path + id.toString()).pipe(
      map(item => new UProgram(item))
    );
  }

  readAll(): Observable<UProgram[]> {
    const path = UProgramService.path;
    return this.http.get<UProgram[]>(path).pipe(
      map(items => items.map(item => new UProgram(item)))
    );
  }

  readByUniversity(universityId: number): Observable<UProgram[]> {
    const path = UProgramService.path + 'university/';
    return this.http.get<UProgram[]>(path + universityId.toString()).pipe(
      map(items => items.map(item => new UProgram(item)))
    );
  }

  update(id: number, item: UProgram): Observable<UProgram> {
    const path = UProgramService.path;
    return this.http.put<UProgram>(path + id.toString(), item).pipe(
      map(item => new UProgram(item))
    );
  }

  delete(id: number): Observable<void> {
    const path = UProgramService.path;
    return this.http.delete<void>(path + id.toString());
  }

}
