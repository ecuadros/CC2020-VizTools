import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class UniversityService {

  static path = environment.APIEndpoint + '/university/';

  constructor(private http: HttpClient) { }

  create(item: any): any {
    const path = UniversityService.path;
    return this.http.post(path, item).toPromise();
  }

  read(id: number): any {
    const path = UniversityService.path;
    return this.http.get(path + id.toString()).toPromise();
  }

  readAll(): any {
    const path = UniversityService.path;
    return this.http.get(path).toPromise();
  }

  readByCountry(id: number): any {
    const path = UniversityService.path;
    return this.http.get(path + 'country/' + id.toString() ).toPromise();
  }

  update(id: number, item: any): any {
    const path = UniversityService.path;
    return this.http.put(path + id.toString(), item).toPromise();
  }

  delete(id: number): any {
    const path = UniversityService.path;
    return this.http.delete(path + id.toString()).toPromise();
  }

}
