import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { DKAG } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class DKAGService {

  static path = environment.APIEndpoint + '/dkag/';

  constructor(private http: HttpClient) { }

  create(item: DKAG): Observable<DKAG> {
    const path = DKAGService.path;
    return this.http.post<DKAG>(path, item).pipe(
      map(item => new DKAG(item))
    );
  }

  read(id: number): Observable<DKAG> {
    const path = DKAGService.path;
    return this.http.get<DKAG>(path + id.toString()).pipe(
      map(item => new DKAG(item))
    );
  }

  readAll(): Observable<DKAG[]> {
    const path = DKAGService.path;
    return this.http.get<DKAG[]>(path).pipe(
      map(items => items.map(item => new DKAG(item)))
    );
  }

  update(id: number, item: DKAG): Observable<DKAG> {
    const path = DKAGService.path;
    return this.http.put<DKAG>(path + id.toString(), item).pipe(
      map(item => new DKAG(item))
    );
  }

  delete(id: number): Observable<void> {
    const path = DKAGService.path;
    return this.http.delete<void>(path + id.toString());
  }

}
