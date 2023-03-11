import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { DKAModel } from '@core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DKAService {

  private BASE_URL = environment.apiUrl + '/dka/';

  constructor(private http: HttpClient) { }

  create(dka: DKAModel): Observable<DKAModel> {
    const url = this.BASE_URL;
    return this.http.post<DKAModel>(url, dka);
  }

  read(): Observable<DKAModel[]> {
    const url = this.BASE_URL;
    return this.http.get<DKAModel[]>(url);
  }

  readById(id: number): Observable<DKAModel> {
    const url = this.BASE_URL + id;
    return this.http.get<DKAModel>(url);
  }

  update(dka: DKAModel): Observable<DKAModel> {
    const url = this.BASE_URL + dka.id;
    return this.http.put<DKAModel>(url, dka);
  }

  delete(id: number): Observable<void> {
    const url = this.BASE_URL + id;
    return this.http.delete<void>(url);
  }

}
