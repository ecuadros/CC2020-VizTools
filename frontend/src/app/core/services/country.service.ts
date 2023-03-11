import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { CountryModel } from '@core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private BASE_URL = environment.apiUrl + '/country/';

  constructor(private http: HttpClient) { }

  read(): Observable<CountryModel[]> {
    const url = this.BASE_URL;
    return this.http.get<CountryModel[]>(url);
  }

  readById(id: number): Observable<CountryModel> {
    const url = this.BASE_URL + id;
    return this.http.get<CountryModel>(url);
  }

}
