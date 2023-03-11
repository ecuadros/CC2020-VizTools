import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { InstitutionModel } from '@core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  private BASE_URL = environment.apiUrl + '/institution/';

  constructor(private http: HttpClient) { }

  create(institution: InstitutionModel): Observable<InstitutionModel> {
    const url = this.BASE_URL;
    return this.http.post<InstitutionModel>(url, institution);
  }

  read(): Observable<InstitutionModel[]> {
    const url = this.BASE_URL;
    return this.http.get<InstitutionModel[]>(url);
  }

  readById(id: number): Observable<InstitutionModel> {
    const url = this.BASE_URL + id;
    return this.http.get<InstitutionModel>(url);
  }

  readByCountryId(countryId: number): Observable<InstitutionModel[]> {
    const url = this.BASE_URL + 'country/' + countryId;
    return this.http.get<InstitutionModel[]>(url);
  }

  update(institution: InstitutionModel): Observable<InstitutionModel> {
    const url = this.BASE_URL + institution.id;
    return this.http.put<InstitutionModel>(url, institution);
  }

  delete(id: number): Observable<void> {
    const url = this.BASE_URL + id;
    return this.http.delete<void>(url);
  }

}
