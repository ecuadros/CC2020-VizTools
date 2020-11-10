import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class UProgramService {

  static path = environment.APIEndpoint + '/uprogram/';

  constructor(private http: HttpClient) { }

  create(item: any): any {
    const path = UProgramService.path;
    return this.http.post(path, item).toPromise();
  }

  read(id: number): any {
    const path = UProgramService.path;
    return this.http.get(path + id.toString()).toPromise();
  }

  readAll(): any {
    const path = UProgramService.path;
    return this.http.get(path).toPromise();
  }

  readByUniversity(universityId: number): any {
    const path = UProgramService.path;
    return this.http.get(path + 'university/' + universityId.toString()).toPromise();
  }

  update(id: number, item: any): any {
    const path = UProgramService.path;
    return this.http.put(path + id.toString(), item).toPromise();
  }

  delete(id: number): any {
    const path = UProgramService.path;
    return this.http.delete(path + id.toString()).toPromise();
  }

}
