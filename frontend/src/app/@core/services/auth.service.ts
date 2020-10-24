import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  static path = environment.APIEndpoint + '/auth/';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const form = {
      email: email,
      password: password
    }
    return this.http.post<any>(AuthService.path + 'login', form)
      .pipe(map(user => {
        if (user && user.token) {
          console.log(user)
          localStorage.setItem('token', user.token);
          localStorage.setItem('admin', user.isAdmin);
          localStorage.setItem('name', user.name);
          localStorage.setItem('id', user.id);
        }
      }
      ));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
  }

  get token(): string {
    return localStorage.getItem('token')
  }

  isAuthenticated(): boolean {
    const token = this.token;
    if (!token) return false;
    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }

}
