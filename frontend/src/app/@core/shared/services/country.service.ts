import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Country } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  static path = environment.APIEndpoint + '/country/';

  constructor(private http: HttpClient) { }

  read(id: number): Observable<Country> {
    const path = CountryService.path;
    return this.http.get<Country>(path + id.toString()).pipe(
      map(item => new Country(item))
    );
  }

  readAll(): Observable<Country[]> {
    const path = CountryService.path;
    return this.http.get<Country[]>(path).pipe(
      map(items => items.map(item => new Country(item)))
    );
  }

}
