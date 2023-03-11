import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ProgramModel } from '@core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private BASE_URL = environment.apiUrl + '/program/';

  constructor(private http: HttpClient) { }

  create(institution: ProgramModel): Observable<ProgramModel> {
    const url = this.BASE_URL;
    return this.http.post<ProgramModel>(url, institution);
  }

  read(): Observable<ProgramModel[]> {
    const url = this.BASE_URL;
    return this.http.get<ProgramModel[]>(url);
  }

  readById(id: number): Observable<ProgramModel> {
    const url = this.BASE_URL + id;
    return this.http.get<ProgramModel>(url);
  }

  readByMultipleIds(ids: number[], includeWeights: boolean = false): Observable<ProgramModel[]> {
    const url = this.BASE_URL + 'multiple/' + '?includeWeights=' + includeWeights;
    return this.http.post<ProgramModel[]>(url, ids);
  }

  readByInstitutionId(id: number): Observable<ProgramModel[]> {
    const url = this.BASE_URL + 'institution/' + id;
    return this.http.get<ProgramModel[]>(url);
  }

  update(institution: ProgramModel): Observable<ProgramModel> {
    const url = this.BASE_URL + institution.id;
    return this.http.put<ProgramModel>(url, institution);
  }

  delete(id: number): Observable<void> {
    const url = this.BASE_URL + id;
    return this.http.delete<void>(url);
  }

}
