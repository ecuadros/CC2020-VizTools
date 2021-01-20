import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  static path = environment.APIEndpoint + '/session/';

  constructor(private http: HttpClient) { }

  readLastSelectedProgram(): Observable<number> {
    const path = SessionService.path + 'selected-program/';
    return this.http.get<number>(path);
  }

  updateLastSelectedProgram(program: any): Observable<void> {
    const path = SessionService.path + 'selected-program/';
    return this.http.get<void>(path + program.toString());
  }

}
