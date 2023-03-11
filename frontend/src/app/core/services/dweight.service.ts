import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DWeightModel } from '@core/models';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DWeightService {

  private BASE_URL = environment.apiUrl + '/discipline-weight/';

  constructor(private http: HttpClient) { }

  readByDisciplineId(disciplineId: number): Observable<DWeightModel[]> {
    const url = this.BASE_URL + 'discipline/' + disciplineId;
    return this.http.get<DWeightModel[]>(url);
  }

  update(institution: DWeightModel): Observable<DWeightModel> {
    const url = this.BASE_URL + institution.id;
    return this.http.put<DWeightModel>(url, institution);
  }

}
