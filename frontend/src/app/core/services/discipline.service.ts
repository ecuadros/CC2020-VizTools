import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { DisciplineModel } from '@core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  private BASE_URL = environment.apiUrl + '/discipline/';

  constructor(private http: HttpClient) { }

  create(discipline: DisciplineModel): Observable<DisciplineModel> {
    const url = this.BASE_URL;
    return this.http.post<DisciplineModel>(url, discipline);
  }

  read(): Observable<DisciplineModel[]> {
    const url = this.BASE_URL;
    return this.http.get<DisciplineModel[]>(url);
  }

  readById(id: number): Observable<DisciplineModel> {
    const url = this.BASE_URL + id;
    return this.http.get<DisciplineModel>(url);
  }

  readByMultipleIds(ids: number[], includeWeights: boolean = false): Observable<DisciplineModel[]> {
    const url = this.BASE_URL + 'multiple/' + '?includeWeights=' + includeWeights;
    return this.http.post<DisciplineModel[]>(url, ids);
  }

  update(discipline: DisciplineModel): Observable<DisciplineModel> {
    const url = this.BASE_URL + discipline.id;
    return this.http.put<DisciplineModel>(url, discipline);
  }

  delete(id: number): Observable<void> {
    const url = this.BASE_URL + id;
    return this.http.delete<void>(url);
  }

}
