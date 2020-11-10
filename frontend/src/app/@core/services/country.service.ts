import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class CountryService {

  static path = environment.APIEndpoint + '/country/';

  constructor(private http: HttpClient) { }

  create(item: any): any {
    const path = CountryService.path;
    return this.http.post(path, item).toPromise();
  }

  read(id: number): any {
    const path = CountryService.path;
    return this.http.get(path + id.toString()).toPromise();
  }

  readAll(): any {
    const path = CountryService.path;
    return this.http.get(path).toPromise();
  }

  update(id: number, item: any): any {
    const path = CountryService.path;
    return this.http.put(path + id.toString(), item).toPromise();
  }

  delete(id: number): any {
    const path = CountryService.path;
    return this.http.delete(path + id.toString()).toPromise();
  }

}