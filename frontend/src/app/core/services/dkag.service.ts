import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { DKAGModel } from '@core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DKAGService {

  private BASE_URL = environment.apiUrl + '/dkag/';

  constructor(private http: HttpClient) { }

  create(dkag: DKAGModel): Observable<DKAGModel> {
    const url = this.BASE_URL;
    return this.http.post<DKAGModel>(url, dkag);
  }

  read(): Observable<DKAGModel[]> {
    const url = this.BASE_URL;
    return this.http.get<DKAGModel[]>(url);
  }

  readById(id: number): Observable<DKAGModel> {
    const url = this.BASE_URL + id;
    return this.http.get<DKAGModel>(url);
  }

  update(dkag: DKAGModel): Observable<DKAGModel> {
    const url = this.BASE_URL + dkag.id;
    return this.http.put<DKAGModel>(url, dkag);
  }

  delete(id: number): Observable<void> {
    const url = this.BASE_URL + id;
    return this.http.delete<void>(url);
  }

}
