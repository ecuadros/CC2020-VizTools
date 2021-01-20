import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { University } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  static path = environment.APIEndpoint + '/university/';

  constructor(private http: HttpClient) { }

  create(item: University): Observable<University> {
    const path = UniversityService.path;
    return this.http.post<University>(path, item).pipe(
      map(item => new University(item))
    );
  }

  read(id: number): Observable<University> {
    const path = UniversityService.path;
    return this.http.get<University>(path + id.toString()).pipe(
      map(item => new University(item))
    );
  }

  readAll(): Observable<University[]> {
    const path = UniversityService.path;
    return this.http.get<University[]>(path).pipe(
      map(items => items.map(item => new University(item)))
    );
  }

  readByCountry(id: number): Observable<University[]> {
    const path = UniversityService.path + 'country/';
    return this.http.get<University[]>(path + id.toString() ).pipe(
      map(items => items.map(item => new University(item)))
    );
  }

  update(id: number, item: University): Observable<University> {
    const path = UniversityService.path;
    return this.http.put<University>(path + id.toString(), item).pipe(
      map(item => new University(item))
    );
  }

  delete(id: number): Observable<void> {
    const path = UniversityService.path;
    return this.http.delete<void>(path + id.toString());
  }

}
