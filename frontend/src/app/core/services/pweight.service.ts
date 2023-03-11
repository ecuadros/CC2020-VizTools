import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { PWeightModel } from '@core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PWeightService {

  private BASE_URL = environment.apiUrl + '/program-weight/';

  constructor(private http: HttpClient) { }

  readByProgramId(programId: number): Observable<PWeightModel[]> {
    const url = this.BASE_URL + 'program/' + programId;
    return this.http.get<PWeightModel[]>(url);
  }

  update(institution: PWeightModel): Observable<PWeightModel> {
    const url = this.BASE_URL + institution.id;
    return this.http.put<PWeightModel>(url, institution);
  }

}
