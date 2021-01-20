import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { DKA } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class DKAService {

  static path = environment.APIEndpoint + '/dka/';

  constructor(private http: HttpClient) { }

  create(item: DKA): Observable<DKA> {
    const path = DKAService.path;
    return this.http.post<DKA>(path, item).pipe(
      map(item => new DKA(item))
    );
  }

  read(id: number): Observable<DKA> {
    const path = DKAService.path;
    return this.http.get(path + id.toString()).pipe(
      map(item => new DKA(item))
    );
  }

  readAll(): Observable<DKA[]> {
    const path = DKAService.path;
    return this.http.get<DKA[]>(path).pipe(
      map(items => items.map(item => new DKA(item)))
    );
  }

  update(id: number, item: DKA): Observable<DKA> {
    const path = DKAService.path;
    return this.http.put<DKA>(path + id.toString(), item).pipe(
      map(item => new DKA(item))
    );
  }

  delete(id: number): Observable<void> {
    const path = DKAService.path;
    return this.http.delete<void>(path + id.toString());
  }

}
