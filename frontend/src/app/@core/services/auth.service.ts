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
          this.storeUser(user);
        }
      }
      ));
  }

  register(form: any) {
    return this.http.post<any>(AuthService.path + 'register', form)
      .pipe(map(user => {
        if (user && user.token) {
          this.storeUser(user);
        }
      }
      ));
  }

  isEmailRegistered(email: string) {

    return this.http.get(AuthService.path + 'check/' + email).toPromise();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('universityId')
    localStorage.removeItem('universityName')
  }

  get token(): string {
    return localStorage.getItem('token')
  }

  get email(): string {
    return localStorage.getItem('email')
  }

  get admin(): string {
    return localStorage.getItem('admin')
  }

  get userName(): string {
    if (this.isAuthenticated()) {
      return localStorage.getItem('name')
    }
    return "";
  }

  get universityId(): number {
    if (this.isAuthenticated() && !this.isAdmin()) {
      return +localStorage.getItem('universityId')
    }
    return -1;
  }

  get universityName(): string {
    if (this.isAuthenticated() && !this.isAdmin()) {
      return localStorage.getItem('universityName')
    }
    return "";
  }

  isAuthenticated(): boolean {
    const token = this.token;
    if (!token) return false;
    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }

  isAdmin(): boolean {
    const admin = this.admin;
    if (!admin) return false;
    return admin == "true";
  }

  private storeUser(user: any) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('admin', user.isAdmin);
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
    localStorage.setItem('id', user.id);

    if (!user.isAdmin) {
      localStorage.setItem('universityId', user.universityId);
      localStorage.setItem('universityName', user.universityName);
    }
  }

}
