import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class ChartService {

  static path = environment.APIEndpoint + '/chart/';

  constructor(private http: HttpClient) { }

  readByProgram(program: string) {
    const path = ChartService.path;
    return this.http.get(path + 'program/' + program).toPromise();
  }

  updateWeight(id: number, item: any): any {
    const path = ChartService.path;
    return this.http.put(path + 'program/' + id.toString(), item).toPromise();
  }

  readByUProgram(program: string) {
    const path = ChartService.path;
    return this.http.get(path + 'uprogram/' + program).toPromise();
  }

  updateUWeight(id: number, item: any): any {
    const path = ChartService.path;
    return this.http.put(path + 'uprogram/' + id.toString(), item).toPromise();
  }

}
